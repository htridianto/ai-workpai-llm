import { ModelConfig } from '@/shared/types/types';

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gpt-4o-mini', // ID resmi untuk Gemini 1.5 Flash
    name: 'GPT 4o Mini',
    description: 'Optimized for speed and efficiency in RAG workflows.',
    maxOutputTokens: 8192,
  },  
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash',
    description: 'Fastest and most cost-effective model for general tasks.',
    maxOutputTokens: 8192,
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro',
    description: 'Best performing model for complex reasoning and coding.',
    maxOutputTokens: 8192,
  },
  {
    id: 'gemini-2.5-flash-image',
    name: 'Gemini 2.5 Flash Image',
    description: 'Specialized for multimodal image tasks.',
  }
];

export const DEFAULT_SYSTEM_INSTRUCTION = `You are a helpful, intelligent assistant in the "WorkPai" frontend interface.
Your goal is to provide accurate, concise, and well-formatted answers.
- Use Markdown for formatting.
- If writing code, use syntax highlighting.
- Be friendly but professional.`;

export const PLACEHOLDER_QUESTIONS = [
  "Explain quantum entanglement like I'm 5",
  "Write a Python script to scrape a website",
  "Help me plan a marketing strategy for coffee",
  "Analyze this code snippet for bugs"
];