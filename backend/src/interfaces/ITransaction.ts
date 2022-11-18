import { z } from 'zod';

const TransactionZodSchema = z.object({
  debitedAccountId: z.number({ required_error: 'Debited account id is required' }),
  creditedAccountId: z.number({ required_error: 'Credited account id is required' }),
  value: z.number({ required_error: 'Value is required' }),
  createdAt: z.date().optional(),
});

export type ITransaction = z.infer<typeof TransactionZodSchema>;
export { TransactionZodSchema };
