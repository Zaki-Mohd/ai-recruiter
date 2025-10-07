import { QUESTIONS_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// OpenRouter/OpenAI client (used for non-google/* models or as a fallback)
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_KEY,
});

// Google Generative AI client (optional, used when model starts with 'google/')
let genAI = null;
if (process.env.GOOGLE_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  } catch (err) {
    console.warn('Failed to initialize GoogleGenerativeAI client:', err?.message || err);
    genAI = null;
  }
}

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type, model } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{jobTitle}}', jobPosition || '')
      .replace('{{jobDescription}}', jobDescription || '')
      .replace('{{duration}}', duration || '')
      .replace('{{type}}', type || '');

    console.log('ai-model prompt length:', FINAL_PROMPT.length);

    // If a Google model is requested and the Google client is available, use it.
    if (model && model.startsWith('google/') && genAI) {
      try {
        // Map requested model to a generative model identifier as needed.
        const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await geminiModel.generateContent(FINAL_PROMPT);
        const response = await result.response;
        const completionText = response.text ? response.text() : String(response);
        console.log('ai-model used google generative');
        return NextResponse.json({ message: completionText });
      } catch (googleErr) {
        console.warn('Google generative model failed:', googleErr?.message || googleErr);
        // fallthrough to try OpenRouter as a fallback
      }
    }

    // Default path: use OpenRouter/OpenAI client. Respect `model` if provided, else try a sensible primary then fallback.
    const primaryModel = model && !model.startsWith('google/') ? model : 'google/gemini-pro-1.5';
    const fallbackModel = 'gpt-4o-mini';

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: primaryModel,
        messages: [{ role: 'user', content: FINAL_PROMPT }],
        max_tokens: 1000,
      });
      console.log('ai-model used', primaryModel);
      return NextResponse.json(chatCompletion.choices?.[0]?.message || { content: chatCompletion });
    } catch (primaryErr) {
      console.warn('Primary OpenRouter model failed, attempting fallback:', primaryErr?.message || primaryErr);
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: fallbackModel,
          messages: [{ role: 'user', content: FINAL_PROMPT }],
          max_tokens: 1000,
        });
        console.log('ai-model used fallback', fallbackModel);
        return NextResponse.json(chatCompletion.choices?.[0]?.message || { content: chatCompletion });
      } catch (fallbackErr) {
        console.error('Fallback model also failed:', fallbackErr);
        return NextResponse.json({ error: String(fallbackErr) }, { status: 502 });
      }
    }
  } catch (e) {
    console.error('ai-model route error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}