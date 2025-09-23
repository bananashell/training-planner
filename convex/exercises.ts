import { v } from 'convex/values'
import { query } from './_generated/server'

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('exercises').collect()
  },
})

export const get = query({
  args: { id: v.id('exercises') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})
