import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  dob: z.string().min(1, "Date of birth is required"),
  courseInterested: z.string().min(1, "Please select a course"),
  currentClass: z.string().min(1, "Please select current class"),
  address: z.string().min(10, "Please enter a complete address"),
});
export type AdmissionInput = z.infer<typeof admissionSchema>;

export const franchiseSchema = z.object({
  applicantName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  investmentCapacity: z.string().min(1, "Please select investment capacity"),
  experience: z.string().min(1, "Please select experience level"),
  message: z.string().optional(),
});
export type FranchiseInput = z.infer<typeof franchiseSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const careerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select experience"),
  resumeUrl: z.string().min(1, "Please upload your resume"),
  coverNote: z.string().optional(),
});
export type CareerInput = z.infer<typeof careerSchema>;

export const courseEnquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  course: z.string().min(1, "Course is required"),
  message: z.string().optional(),
});
export type CourseEnquiryInput = z.infer<typeof courseEnquirySchema>;
