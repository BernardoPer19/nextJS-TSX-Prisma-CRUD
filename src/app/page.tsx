"use client"
import ContactForm from '@/components/Form';
import { NotesCard } from '@/components/NotesCard';
import { NoteContext } from '@/context/NoteContext';
import { NoteType } from '@/types/Notes';
import { NextPage } from 'next';
import { useContext, useEffect } from 'react';



const Home: NextPage = async () => {

  const {notes,loadNotes} = useContext(NoteContext)

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
