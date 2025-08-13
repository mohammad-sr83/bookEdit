import {
  BookFormSchema,
  TextBookFormSchema,
  LessonBookFormSchema,
  LessonFormSchema,
  SectionFormSchema
} from "./schema";
import { z } from "zod";

export type TDataTableBook = z.infer<typeof BookFormSchema>;
export type TDataTableTextBook = z.infer<typeof TextBookFormSchema>;
export type TDataTableLessonBook = z.infer<typeof LessonBookFormSchema>;
export type TDataTableLesson = z.infer<typeof LessonFormSchema>;
export type TDataTableSection = z.infer<typeof SectionFormSchema>;

export interface IDialogProps {
  label: string;
  button: string;
  openDialog: boolean;
  handleCloseDialog: () => void;
  dialogType: "edit" | "delete" | "create" | null;
  id: number;
  showadd?: boolean;
}
