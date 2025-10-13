import { NextResponse } from 'next/server';
import { ATS_PROMPT } from '../../../../services/Constants';
import OpenAI from 'openai';

// Initialize the OpenRouter client
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_KEY,
});

export async function POST(request) {
  try {
    const { resume, jobDescription } = await request.json();

    if (!resume || !jobDescription) {
      return NextResponse.json({ error: 'Missing resume or job description' }, { status: 400 });
    }

    // Prepare the prompt for the new API
    const prompt = ATS_PROMPT.replace('{{resume}}', resume).replace('{{jobDescription}}', jobDescription);

    // Make the API call to OpenRouter
    const chatCompletion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // Or another model available on OpenRouter
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    
    const responseContent = chatCompletion.choices[0].message.content;

    // The response should already be a valid JSON string
    return NextResponse.json(JSON.parse(responseContent));

  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}
