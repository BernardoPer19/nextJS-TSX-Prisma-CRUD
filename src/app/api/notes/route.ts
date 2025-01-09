import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


//Funcion para obtener info de la api
export async function GET() {
  const notesList = await prisma.note.findMany();

  return NextResponse.json(notesList);
}

export async function POST(request: Request) {
    try {
      const { title, content } = await request.json();
       if (!title) {
        return NextResponse.json({ error: "El campo 'title' es obligatorio." }, { status: 400 });
      }
  
      const newNote = await prisma.note.create({
        data: {
          title,
          content: content || "",  
        },
      });
  
      return NextResponse.json(newNote);
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      return NextResponse.json({ error: "Hubo un error al procesar la solicitud." }, { status: 500 });
    }
  }
  