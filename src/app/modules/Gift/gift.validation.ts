import { z } from "zod";

const createGiftValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        occasion: z.string(),
        recipient: z.string(),
        category: z.string(),
        theme: z.string(),
        brand: z.string(),
        material: z.string(),
    })
})
const updateGiftValidationSchema = z.object({
    body: z.object({
        createdBy: z.string().optional(),
        name: z.string().optional(),
        price: z.number().optional(),
        quantity: z.number().optional(),
        occasion: z.string().optional(),
        recipient: z.string().optional(),
        category: z.string().optional(),
        theme: z.string().optional(),
        brand: z.string().optional(),
        material: z.string().optional(),
    })
})

export const GiftValidations = {
    createGiftValidationSchema,
    updateGiftValidationSchema
}