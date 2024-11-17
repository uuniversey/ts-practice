import { z } from 'zod'

export const quoteListItemSchema = z.object({
  id: z.number(),
  quote: z.string(),
  author: z.string(),
})

export type QuoteListItem = z.infer<typeof quoteListItemSchema>

export const getQuotesResponseSchema = z.object({
  quotes: z.array(quoteListItemSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type GetQuotesResponse = z.infer<typeof getQuotesResponseSchema>