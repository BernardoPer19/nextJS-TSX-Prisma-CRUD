import { NoteType } from "@/types/Notes";
import React from "react";

interface NotesProps {
  note: NoteType;
}

export const NotesCard = ({ note }: NotesProps) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <h2 className="text-xl font-bold text-white truncate">{note.title}</h2>
      </div>
      <div className="p-4">
        <p className="text-gray-700 line-clamp-3">{note.content}</p>
      </div>
      <div className="p-4 bg-gray-100 flex justify-end">
        <button className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 rounded-md transition-colors duration-300">
          Read More
        </button>
      </div>
    </div>
  );
};
