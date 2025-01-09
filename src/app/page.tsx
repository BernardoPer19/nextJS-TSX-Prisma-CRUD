import ContactForm from '@/components/Form';
import { NotesCard } from '@/components/NotesCard';
import { NoteType } from '@/types/Notes';
import { NextPage } from 'next';



async function loadNotes() {
  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();
  return data;
}


const Home: NextPage = async () => {
  const notes: NoteType[] = await loadNotes(); // Obtiene los datos del servidor
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
