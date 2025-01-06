import { z } from 'zod'

export const CustomerSchema = z.object({
    name: z.string().nonempty('Digite um nome válido'),
    email: z.string().email('Digite um email válido'),
    phone: z.string().min(10, 'Digite um telefone válido'),
    document: z.string().min(10, 'Digite um CPF válido'),
})

export type CustomerType = z.infer<typeof CustomerSchema>
