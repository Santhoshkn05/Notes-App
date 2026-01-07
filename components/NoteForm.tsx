"use client";

import { useEffect, useState } from "react";
import { Note } from "@/app/page";

interface Props {
  onSave: (note: { title: string; content: string }) => void;
  selectedNote: Note | null;
}

export default function NoteForm({ onSave, selectedNote }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">
        {selectedNote ? "Edit Note" : "Create New Note"}
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="input"
          placeholder="Notes title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="input"
          placeholder="Note content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button className="button">
          {selectedNote ? "Update Note" : "Add Notes"}
        </button>
      </form>
    </div>
  );
}
