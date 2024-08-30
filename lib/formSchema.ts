import z from "zod"

export const addProductSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive(),
    image: z.string().nonempty(),
})
