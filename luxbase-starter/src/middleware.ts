// src/middleware.ts
import { defineMiddleware } from 'astro/middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  // passthrough; guards sind im Layout/Seiten-Frontmatter umgesetzt
  return next()
})
