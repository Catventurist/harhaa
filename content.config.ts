import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod/v4'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['terms/*.md']
      }
    }),
    terms: defineCollection({
      type: 'page',
      source: {
        include: 'terms/*.md'
      },
      schema: z.object({
        slug: z.string(),
        hiddenSubject: z.string(),
        patient: z.string(),
        tool: z.string(),
        consequence: z.string().optional(),
        mechanism: z.enum(['passive', 'gerund', 'nominalisation', 'metaphor', 'euphemism', 'absence', 'bureaucratic', 'technocratic']),
        activeForm: z.string(),
        collocations: z.array(z.string()),
        ambiguity: z.string(),
        temporality: z.enum(['permanent', 'transitional', 'urgent', 'cyclical']),
        category: z.array(z.string()),
        institution: z.string().optional(),
        documentType: z.string(),
        audience: z.array(z.string()),
        region: z.array(z.string()),
        era: z.object({ from: z.number(), peak: z.number().optional(), to: z.number().optional() }),
        intensity: z.number().min(1).max(5),
        tone: z.enum(['reassuring', 'urgent', 'paternalistic', 'neutral', 'aspirational']),
        emotionalLoad: z.string(),
        cognitiveLoad: z.number().min(1).max(3),
        origin: z.object({ term: z.string(), language: z.string(), year: z.number(), context: z.string() }),
        crossRegime: z.array(z.object({ regime: z.string(), term: z.string(), note: z.string().optional() })),
        relatedTerms: z.array(z.string()),
        counterTerm: z.string(),
        example: z.object({ text: z.string(), source: z.string(), url: z.string().optional() }),
        frequency: z.number().optional(),
        irony: z.string(),
        orwellScore: z.number().min(0).max(10)
      })
    })
  }
})
