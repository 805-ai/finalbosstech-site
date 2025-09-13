const { GoogleGenAI } = require('@google/genai');

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Vary': 'Origin',
};

// Fail fast at module load if missing config
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY not configured');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        ...jsonHeaders,
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let prompt;
  try {
    const body = JSON.parse(event.body || '{}');
    prompt = body.prompt;
  } catch {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Malformed JSON' }),
    };
  }

  if (typeof prompt !== 'string' || !prompt.trim()) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Missing or invalid prompt' }),
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const text = response.text || response.data?.text || '';
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Gemini request failed', details: err.message }),
    };
  }
};
