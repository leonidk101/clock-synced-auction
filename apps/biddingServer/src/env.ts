import { z } from 'zod/v4'

const envSchema = z.object({
	PORT: z.coerce.number(),
	VERSION: z.coerce.number(),
	DATABASE_URL: z.string(),
})

const parseResult = envSchema.safeParse(process.env)

if (!parseResult.success) {
	console.error('❌ Invalid environment variables:', z.prettifyError(parseResult.error))
	process.exit(1)
}

export const env = parseResult.data
