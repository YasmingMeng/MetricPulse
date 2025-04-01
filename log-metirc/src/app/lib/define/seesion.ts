/*
 * @Description: 
 * @Date: 2025-03-13 23:36:00
 * @LastEditTime: 2025-03-13 23:36:12
 */
import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  userId: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  // email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        userId?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined