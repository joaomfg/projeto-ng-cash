import { z } from 'zod';

const AccountZodSchema = z.object({
  id: z.number().optional(),
  balance: z.number({ required_error: 'Balance is required' }),
});

export type IAccount = z.infer<typeof AccountZodSchema>;
export { AccountZodSchema };
