import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const notes = await prisma.note.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!notes) {
      return NextResponse.json(
        {
          message: "note not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          messaje: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deleteNote) {
      return NextResponse.json(
        {
          message: "note not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteNote);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          messaje: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();

    const updateNote = await prisma.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        content,
      },
    });
    if (!updateNote) {
      return NextResponse.json(
        {
          message: "note not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(updateNote);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          messaje: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
