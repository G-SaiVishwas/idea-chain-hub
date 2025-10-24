import OpenAI from 'openai';

let client = null;

export const openAIClient = (() => {
  if (client) {
    return client;
  }

  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
})();

export default openAIClient;
