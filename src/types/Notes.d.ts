import { Note } from "@prisma/client";

export type CreateNoteType = Omit<Note,"id"| "createAt"| "updateAt">
export type UpdateNoteType = Partial<CreateNoteType>