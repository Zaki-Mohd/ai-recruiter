import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_KEY,
});

export async function POST(req) {
  const { conversation } = await req.json();

  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });
    const feedbackContent = chatCompletion.choices[0].message.content;

    return NextResponse.json({ content: feedbackContent });
  } catch (e) {
    console.log("API Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
