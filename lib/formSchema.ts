import z from "zod"

export const addProductSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be a positive number",
    }),
    image: z.string().nonempty(),
    // category: z.string(),
    // quantity: z
    // .string()
    // .min(1, "Quantity is required")
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val) && val >= 0, {
    //   message: "Quantity must be a non-negative number",
    // }),
})
