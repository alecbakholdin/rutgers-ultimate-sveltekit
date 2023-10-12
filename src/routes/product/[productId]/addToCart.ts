import { z } from "zod";

export const AddToCartSchema = z.object({
	quantity: z.number().positive().int(),
	properties: z.record(z.string(), z.any())
});
