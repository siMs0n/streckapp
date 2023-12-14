import { ValidationError } from '../../errors';
import { z } from 'zod';

export const CreatePaymentSchema = z.object({
  amount: z
    .number()
    .positive()
    .lte(1000, { message: '1000kr is the maximum allowed amount' }),
  reference: z.string(),
  person: z.string(),
  instance: z.string(),
});

export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;
