import { z } from 'zod'

export const WithdrawSchema = z.object({
    withdrawValue: z.string().min(1),
})

export type WithdrawType = z.infer<typeof WithdrawSchema>
