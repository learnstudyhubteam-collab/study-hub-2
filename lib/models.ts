export const AI_MODELS = {
  free: 'claude-haiku-4-5-20251001',
  plus: 'claude-haiku-4-5-20251001',
  pro: 'claude-sonnet-4-6',
} as const

export type ModelTier = keyof typeof AI_MODELS
