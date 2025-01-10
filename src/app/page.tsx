"use client"
import ContactForm from '@/components/Form';
import { NotesCard } from '@/components/NotesCard';
import {  useNotesContext } from '@/context/NoteContext';
import { NextPage } from 'next';
import {  useEffect } from 'react';



const Home: NextPage =  () => {

  const {notes,loadNotes} = useNotesContext()

  useEffect(()=>{loadNotes()},[])
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 space-y-10">
      <ContactForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note) => (
          <NotesCard key={note.id} note={note} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
