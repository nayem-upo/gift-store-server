import { z } from "zod";

export const createHistorySchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        date: z.string(),
        buyer: z.string(),
        seller: z.string(),
    })
});

export const HistoryValidations = {
    createHistorySchema
}