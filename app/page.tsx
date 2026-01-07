"use client";

import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async (note: { title: string; content: string }) => {
    await fetch("/api/notes", {
      method: selectedNote ? "PUT" : "POST",
      body: JSON.stringify(
        selectedNote ? { ...note, id: selectedNote._id } : note
      ),
    });
    setSelectedNote(null);
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  return (
    <main className="container">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Notes App</h1>
        <p className="text-gray-500 mt-2">
          Capture ideas, organize thoughts, and boost productivity
        </p>
      </header>

      <NoteForm onSave={saveNote} selectedNote={selectedNote} />

      <h2 className="text-xl font-semibold mt-12 mb-4">View List</h2>
      
      <div className="bg-gray-50 p-6 rounded-xl">
        <NotesList
        notes={notes}
        onEdit={setSelectedNote}
        onDelete={deleteNote}
        />
        </div>
    </main>
  );
}
