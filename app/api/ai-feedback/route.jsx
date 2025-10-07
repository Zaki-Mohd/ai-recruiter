import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){
        const {Conversation} = await req.json();
        const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(Conversation));

         try {
        
          
            const openai = new OpenAI({
          baseURL: "https://openrouter.ai/api/v1",
          apiKey: process.env.OPEN_ROUTER_KEY,
        })
            const primaryModel = "google/gemini-pro-1.5";
            const fallbackModel = "gpt-4o-mini";

            try {
              const completion = await openai.chat.completions.create({
                model: primaryModel,
                messages: [
                  { role: "user", content: FINAL_PROMPT }
                ],
                max_tokens: 1000,
              });
              console.log('ai-feedback used', primaryModel);
              return NextResponse.json(completion.choices[0].message);
            } catch (innerErr) {
              console.warn('Primary feedback model failed, trying fallback', innerErr?.message || innerErr);
              try {
                const completion = await openai.chat.completions.create({
                  model: fallbackModel,
                  messages: [
                    { role: "user", content: FINAL_PROMPT }
                  ],
                  max_tokens: 1000,
                });
                console.log('ai-feedback used fallback', fallbackModel);
                return NextResponse.json(completion.choices[0].message);
              } catch (fallbackErr) {
                console.error('Feedback fallback failed', fallbackErr);
                return NextResponse.json({ error: String(fallbackErr) });
              }
            }
        
              }
              catch(e){
                console.log(e);
                return NextResponse.json({ error: String(e) })
              }




}