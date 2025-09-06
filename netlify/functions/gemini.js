const { GoogleGenAI } = require('@google/genai');

exports.handler = async (event) => {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Missing GEMINI_API_KEY');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let prompt;
  try {
    const body = JSON.parse(event.body || '{}');
    prompt = body.prompt;
  } catch (err) {
    console.error('Malformed JSON', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Malformed JSON' }),
    };
  }

  if (typeof prompt !== 'string' || prompt.trim() === '') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing prompt' }),
    };
  }

  const ai = new GoogleGenAI({});

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response.text;
    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    console.error('Gemini request failed', err);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'Gemini request failed', details: err.message }),
    };
  }
};
