"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { CreateNoteType, UpdateNoteType } from "@/types/Notes";
import { Note } from "@prisma/client";

interface NoteContextValue {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNoteType) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  updateNote: (id: number, note: UpdateNoteType) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void; 
}

interface NoteContextProps {
  children: ReactNode;
}


export const NoteContext = createContext<NoteContextValue>({
  notes: [],
  setNotes: () => {},
  loadNotes: async () => {},
  createNote: async (note: CreateNoteType) => {},
  handleDelete: async (id: number) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {}, 
  updateNote: async (id: number, note: UpdateNoteType) => {},
});

function NoteContextProvider({ children }: NoteContextProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  async function loadNotes() {
    try {
      const res = await fetch("http://localhost:3000/api/notes");
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  async function createNote(note: CreateNoteType) {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error creating note: ${res.status}`);
      }

      const newNote = await res.json();
      setNotes((prevNotes) => [...prevNotes, newNote]); 
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error deleting note");
      }
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  async function updateNote(id: number, note: UpdateNoteType) {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error updating note: ${res.status}`);
      }

      const data = await res.json();
      setNotes(notes.map((note)=>(note.id === id ? data : note)))
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        loadNotes,
        createNote,
        handleDelete,
        setSelectedNote, 
        selectedNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContextProvider;

export function useNotesContext() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("ERROR! Context not found");
  }
  return context;
}
