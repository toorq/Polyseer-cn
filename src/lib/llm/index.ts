import { LanguageModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { openai } from '@ai-sdk/openai';

// Get environment configuration
const LLM_PROVIDER = process.env.LLM_PROVIDER || 'openai';
const VOLC_AK = process.env.VOLC_AK;
const VOLC_BASE_URL = process.env.VOLC_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3/';
const VOLC_MODEL = process.env.VOLC_MODEL || 'doubao-seed-2.0-code';

// Get the main model (for planning, critique, analysis - uses larger model)
export function getModel(): LanguageModel {
  if (LLM_PROVIDER === 'volc' || LLM_PROVIDER === 'volcengine' || LLM_PROVIDER === 'doubao') {
    if (!VOLC_AK) {
      throw new Error('VOLC_AK environment variable is required for Volcengine (Doubao) provider');
    }
    const volcClient = createOpenAICompatible({
      baseURL: VOLC_BASE_URL,
      apiKey: VOLC_AK,
      name: 'doubao',
    });
    return volcClient(VOLC_MODEL) as unknown as LanguageModel;
  }
  return openai('gpt-4o') as unknown as LanguageModel;
}

// Get the small model (for simpler tasks like relevance checking, reporting)
export function getModelSmall(): LanguageModel {
  if (LLM_PROVIDER === 'volc' || LLM_PROVIDER === 'volcengine' || LLM_PROVIDER === 'doubao') {
    if (!VOLC_AK) {
      throw new Error('VOLC_AK environment variable is required for Volcengine (Doubao) provider');
    }
    const volcClient = createOpenAICompatible({
      baseURL: VOLC_BASE_URL,
      apiKey: VOLC_AK,
      name: 'doubao',
    });
    const modelId = process.env.VOLC_MODEL_SMALL || VOLC_MODEL;
    return volcClient(modelId) as unknown as LanguageModel;
  }
  return openai('gpt-4o-mini') as unknown as LanguageModel;
}

// Get the large model (for niche authority analysis - may use GPT-5)
export function getModelLarge(): LanguageModel {
  if (LLM_PROVIDER === 'volc' || LLM_PROVIDER === 'volcengine' || LLM_PROVIDER === 'doubao') {
    if (!VOLC_AK) {
      throw new Error('VOLC_AK environment variable is required for Volcengine (Doubao) provider');
    }
    const volcClient = createOpenAICompatible({
      baseURL: VOLC_BASE_URL,
      apiKey: VOLC_AK,
      name: 'doubao',
    });
    return volcClient(VOLC_MODEL) as unknown as LanguageModel;
  }
  return openai('gpt-5') as unknown as LanguageModel;
}
