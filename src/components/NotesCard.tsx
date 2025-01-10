import React from "react";
import {useNotesContext} from '@/context/NoteContext'
import { Note } from "@prisma/client";
interface NotesProps {
  note: Note;
}


export const NotesCard = ({ note }: NotesProps) => {


const {handleDelete,setSelectedNote} = useNotesContext()
  

  return (
    <div className="max-w-sm w-96 mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <h2 className="text-xl font-bold text-white truncate">{note.title}</h2>
      </div>
      <div className="p-4">
        <p className="text-gray-700 line-clamp-3">{note.content}</p>
      </div>
      <div className="p-4 bg-gray-100 flex justify-end gap-4">
        <button 
        onClick={()=>{setSelectedNote(note)}}
        className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 rounded-md transition-colors duration-300">
          Edit Note
        </button>
        <button 
        onClick={async ()=>{
          if (confirm("estas seguro de querer eliminar la nota?")) {
            await handleDelete(note.id)
          }
        }}
        className="px-4 py-2 text-sm font-semibold  bg-red-500  text-white hover:bg-red-600 border border-red-600 rounded-md transition-colors duration-300">
          Read More
        </button>
      </div>
    </div>
  );
};
