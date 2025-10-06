import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){

  const {jobPosition, jobDescription, duration, type} = await req.json();
  const FINAL_PROMPT = QUESTIONS_PROMPT
  .replace('{{jobTitle}}',jobPosition)
  .replace('{{jobDescription}}', jobDescription)
  .replace('{{duration}}',duration)
  .replace('{{type}}',type)
  console.log(FINAL_PROMPT)
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_KEY,
    });

    const primaryModel = "google/gemini-pro-1.5";
    const fallbackModel = "gpt-4o-mini"; // fallback if primary isn't available on OpenRouter

    try {
      const completion = await openai.chat.completions.create({
        model: primaryModel,
        messages: [
          { role: "user", content: FINAL_PROMPT }
        ],
        max_tokens: 1000,
      });
      console.log('ai-model used', primaryModel);
      return NextResponse.json(completion.choices[0].message);
    } catch (innerErr) {
      console.warn('Primary model failed, attempting fallback:', innerErr?.message || innerErr);
      // If openrouter reports no endpoint for model, retry with fallback
      try {
        const completion = await openai.chat.completions.create({
          model: fallbackModel,
          messages: [
            { role: "user", content: FINAL_PROMPT }
          ],
          max_tokens: 1000,
        });
        console.log('ai-model used fallback', fallbackModel);
        return NextResponse.json(completion.choices[0].message);
      } catch (fallbackErr) {
        console.error('Fallback model also failed:', fallbackErr);
        return NextResponse.json({ error: String(fallbackErr) });
      }
    }

  } catch(e){
    console.log(e);
    return NextResponse.json({ error: String(e) });
  }


}