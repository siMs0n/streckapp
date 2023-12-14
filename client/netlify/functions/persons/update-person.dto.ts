import { z } from 'zod';
const UpdatePersonSchema = z.object({
  name: z.string(),
  balance: z.number(),
  instance: z.string(),
});

export type UpdatePersonDto = z.infer<typeof UpdatePersonSchema>;
