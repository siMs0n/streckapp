import { ValidationError } from '../../errors';
import { z } from 'zod';

export const CreatePurchaseSchema = z.object({
  quantity: z.number().gte(1).lte(50),
  product: z.string(),
  person: z.string(),
  instance: z.string(),
});

export type CreatePurchaseDto = z.infer<typeof CreatePurchaseSchema>;
