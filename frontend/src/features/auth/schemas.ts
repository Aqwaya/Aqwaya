import z from 'zod';

export const loginSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().nonempty('Password is required'),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password should be at least 8 characters')
    .max(25, 'Password should not be more than 25 characters'),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
  //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters',
  // ),
});

export const forgotPasswordSchema = z.object({
  email: z.email('Invalid email address'),
});
export const verifyEmailSchema = z.object({
  otp: z.string().length(6, 'Enter the 6-digit code'),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export type SignupFormValues = z.infer<typeof signupSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
