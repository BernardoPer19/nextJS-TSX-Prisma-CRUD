"use client";

import React, { ReactNode, createContext, useState } from "react";
import { NoteType } from "@/types/Notes";

interface NoteContextValue {
  notes: NoteType[]; 
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  loadNotes: () => Promise<void>; 
}

interface NoteContextProps {
  children: ReactNode;
}

// Creando el contexto con un valor inicial vacío para evitar errores
export const NoteContext = createContext<NoteContextValue>({
  notes: [],
  setNotes: () => {},
  loadNotes: async () => {},
});

function NoteContextProvider({ children }: NoteContextProps) {
  const [notes, setNotes] = useState<NoteType[]>([]);

  async function loadNotes() {
    try {
      const res = await fetch("http://localhost:3000/api/notes");
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data: NoteType[] = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, loadNotes }}>
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContextProvider;
