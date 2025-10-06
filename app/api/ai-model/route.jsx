import { QUESTIONS_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{jobTitle}}', jobPosition || '')
      .replace('{{jobDescription}}', jobDescription || '')
      .replace('{{duration}}', duration || '')
      .replace('{{type}}', type || '');

    console.log('ai-model prompt length:', FINAL_PROMPT.length);

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPEN_ROUTER_KEY,
    });

    const primaryModel = 'google/gemini-pro-1.5';
    const fallbackModel = 'gpt-4o-mini';

    try {
      const completion = await openai.chat.completions.create({
        model: primaryModel,
        messages: [{ role: 'user', content: FINAL_PROMPT }],
        max_tokens: 1000,
      });
      console.log('ai-model used', primaryModel);
      return NextResponse.json(completion.choices?.[0]?.message || { content: completion });
    } catch (primaryErr) {
      console.warn('Primary model failed, attempting fallback:', primaryErr?.message || primaryErr);
      try {
        const completion = await openai.chat.completions.create({
          model: fallbackModel,
          messages: [{ role: 'user', content: FINAL_PROMPT }],
          max_tokens: 1000,
        });
        console.log('ai-model used fallback', fallbackModel);
        return NextResponse.json(completion.choices?.[0]?.message || { content: completion });
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