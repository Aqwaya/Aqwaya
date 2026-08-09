import { z } from 'zod';

export const businessProfileSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  website: z.url('Enter a valid URL'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  employees: z.string().min(1, 'Company size is required'),
  brandColor: z.string().min(1, 'Brand color is required'),
  logo: z
    .instanceof(File, { message: 'Logo is required' })
    .refine((f) => f.size <= 2 * 1024 * 1024, 'Logo must be under 2MB')
    .refine(
      (f) =>
        ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(
          f.type,
        ),
      'Only PNG, JPG or SVG allowed',
    ),
});

export type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>;
