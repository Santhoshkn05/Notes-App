import { Note } from "@/app/page";

interface Props {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NotesList({ notes, onEdit, onDelete }: Props) {
  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        No notes available. Create one above 👆
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <div
          key={note._id}
          className="card note-card flex justify-between items-start"
        >
          {/* Left content */}
          <div className="max-w-[70%]">
            <h3 className="text-lg font-bold text-black">
              {note.title}
            </h3>

            <p className="text-gray-700 mt-2">
              {note.content}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              Created on {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Right buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(note)}
              className="
                bg-red-600
                text-white
                px-5 py-2
                font-semibold
                rounded
                border-2 border-black
                hover:bg-red-700
                active:scale-95
                transition
              "
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(note._id)}
              className="
                bg-red-600
                text-white
                px-5 py-2
                font-semibold
                rounded
                border-2 border-black
                hover:bg-red-700
                active:scale-95
                transition
              "
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
