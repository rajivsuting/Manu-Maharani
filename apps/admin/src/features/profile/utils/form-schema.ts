import * as z from 'zod';

export const profileSchema = z.object({
  city: z.string().min(1, { message: "Please select a category" }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: "Please select a category" }),
  email: z
    .string()
    .email({ message: "Product Name must be at least 3 characters" }),
  firstname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  // jobs array is for the dynamic fields
  jobs: z.array(
    z.object({
      employer: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "End date should be in the format YYYY-MM-DD",
      }),
      jobcity: z.string().min(1, { message: "Please select a category" }),
      jobcountry: z.string().min(1, { message: "Please select a category" }),
      jobtitle: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: "Start date should be in the format YYYY-MM-DD",
        }),
    })
  ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
