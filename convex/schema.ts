import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
   exercises: defineTable({
    description: v.optional(v.string()),
    image: v.object({
      blurhash: v.optional(v.string()),
      url: v.optional(v.string())
    }),
    links: v.array(
      v.object({ type: v.union(v.literal("instagram"), v.literal("youtube")), url: v.string() })
    ),
    name: v.string(),
    tags: v.array(v.string()),
  }),
})
