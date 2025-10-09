import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_KEY,
});

export async function POST(req) {
  const { Conversation } = await req.json();
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(Conversation)
  );

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      max_tokens: 1000,
    });
    const feedback = chatCompletion.choices[0].message.content;

    return NextResponse.json({ content: feedback });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
