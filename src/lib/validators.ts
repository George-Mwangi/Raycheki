import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  company: z.string().max(160).optional().or(z.literal("")),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.string().min(2).max(120),
  message: z.string().min(5, "Please add a short message").max(4000),
  // honeypot: must be empty
  website: z.string().max(0).optional()
});

export type InquiryInput = z.infer<typeof inquirySchema>;
