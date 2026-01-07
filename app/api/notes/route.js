import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET all notes
export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// CREATE note
export async function POST(req) {
  await connectDB();
  const { title, content } = await req.json();

  const note = await Note.create({ title, content });
  return NextResponse.json(note, { status: 201 });
}

// UPDATE note
export async function PUT(req) {
  await connectDB();
  const { id, title, content } = await req.json();

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(updatedNote);
}

// DELETE note
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();

  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Note deleted" });
}
