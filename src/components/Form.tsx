"use client";
import { useEffect, useRef, useState } from "react";
import { useNotesContext } from "@/context/NoteContext";

const NoteForm = () => {
  const { createNote, selectedNote, setSelectedNote, updateNote } =
    useNotesContext(); // Corregido aquí
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedNote) {
      setFormData({
        title: selectedNote.title,
        content: selectedNote.content || "",
      });
    }
  }, [selectedNote]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedNote) {
      try {
        await updateNote(selectedNote.id, {
          title: formData.title,
          content: formData.content,
        });
        setSelectedNote(null); // Limpiar la selección
        setFormData({ title: "", content: "" });
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        await createNote({
          title: formData.title,
          content: formData.content,
        });
        setFormData({ title: "", content: "" });
        titleRef.current?.focus();
      } catch (error) {
        console.error("Error saving note:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold text-white text-center">
        Create a Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-2 p-3 w-full border-none rounded-lg shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Enter the note title"
            ref={titleRef}
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-white"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={5}
            className="mt-2 p-3 w-full border-none rounded-lg shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Write your note content here..."
          ></textarea>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="py-3 px-6 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {selectedNote ? "update" : "create"}
          </button>

          {selectedNote && (
            <button
              onClick={() => {
                setSelectedNote(null);
                setFormData({ title: "", content: "" });
              }}
              type="button"
              className="py-3 px-6 bg-white text-blue-700  font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
