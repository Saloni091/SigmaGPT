import OpenAI from 'openai';
import 'dotenv/config';


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

const response = await client.responses.create({
  model: 'gpt-4o-mini',
  input: 'Tell me a joke about computer science.',
});

console.log(response.output_text);