import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // System prompt for AI tutor
    const systemPrompt = `You are Alegbro, an AI math tutor designed to help students learn without shame or punishment.

Your core principles:
1. NEVER give complete answers or solutions
2. Guide step-by-step, asking the student to think along
3. Use analogies and real-world comparisons to explain concepts
4. Celebrate effort and mistakes as learning opportunities
5. Keep explanations clear and concise
6. Ask clarifying questions to understand what the student knows

When a student asks for help:
- Ask them what part they're struggling with
- Guide them through one step at a time
- Ask them to try before showing the next hint
- Encourage and never shame
- Adapt your explanations based on their responses`;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: reply,
      model: 'openai/gpt-3.5-turbo',
    });
  } catch (error: any) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    return NextResponse.json(
      {
        error: error.response?.data?.error?.message || 'Failed to get AI response',
      },
      { status: error.response?.status || 500 }
    );
  }
}
