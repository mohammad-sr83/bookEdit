import { z } from "zod";

export interface Rectangle {
  id: number;
  type: "crop" | "quiz" | "photo"|"response";
  x: number;
  y: number;
  width: number;
  height: number;
  description?:string;
}

export const BookFormSchema = z.object({
  id: z.union([z.string(), z.number()]),
  pic: z.union([z.string(), z.undefined()]),
  title: z.string(),
  author: z.string().optional(),
  publishDate: z.string(),
  publisher: z.string().optional(),
  isbn: z.string(),
  price: z.number().optional(),
  tags: z.array(z.string()).optional(),
  isEnabled: z.boolean(),
  time: z.string().optional(),
  cover: z.instanceof(File).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
});

export const TextBookFormSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name:z.string(),
  educationalBase:z.array(z.string(),z.undefined()).optional(),
  book:z.array(z.string()).optional(),
  description: z.string().optional(),
  yearOfPublication:z.string().optional(),
  fileBook:z.string().optional(),
  fileAnswerSheet:z.string().optional()
});

export const LessonBookFormSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  code:z.string().optional(),
  level: z.enum(["1","2","3","4","5","6","7","8","9","10","11","12"]),
  cover: z.union([z.string(), z.undefined(),z.instanceof(File)]).optional(),
});

export const LessonFormSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
});

export const SectionFormSchema = z.object({
  id: z.union([z.string(), z.number()]),
  text: z.string(),
  keyWords: z.array(z.string()).optional(),
});