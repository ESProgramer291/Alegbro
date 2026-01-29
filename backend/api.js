// OpenRouter API integration
const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function callOpenRouter(messages, model = 'openai/gpt-3.5-turbo') {
  try {
    const response = await axios.post(OPENROUTER_API_URL, {
      model,
      messages,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { callOpenRouter };
