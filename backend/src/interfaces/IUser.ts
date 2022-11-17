import { z } from 'zod';

const UserZodSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3),
  password: z.string({ required_error: 'Password is required' }).min(8),
});

export type IUser = z.infer<typeof UserZodSchema>;
export { UserZodSchema };
