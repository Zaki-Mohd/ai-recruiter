import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type, model = "openai/gpt-3.5-turbo" } = await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  console.log("Prompt:", FINAL_PROMPT);

  try {
    let completion;

    if (model.startsWith("google/")) {
      if (!process.env.GOOGLE_API_KEY) {
        return NextResponse.json({ error: "Missing GOOGLE_API_KEY" }, { status: 500 });
      }
      const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await geminiModel.generateContent(FINAL_PROMPT);
      const response = await result.response;
      completion = response.text();
    } else {
      if (!process.env.OPEN_ROUTER_KEY) {
        return NextResponse.json({ error: "Missing OPEN_ROUTER_KEY" }, { status: 500 });
      }
      const chatCompletion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: FINAL_PROMPT }],
        max_tokens: 1000,
      });
      completion = chatCompletion.choices[0].message.content;
    }

    console.log("Completion:", completion);
    return NextResponse.json({ content: completion });
  } catch (e) {
    console.error("/api/ai-model error:", e);
    const message = typeof e === "string" ? e : e?.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
