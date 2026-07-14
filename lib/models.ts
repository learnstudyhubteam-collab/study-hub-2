export const AI_MODELS = {
  free: 'claude-haiku-4-5-20251001',
  plus: 'claude-sonnet-4-6',
  pro: 'claude-opus-4-8',
} as const

export type ModelTier = keyof typeof AI_MODELS
