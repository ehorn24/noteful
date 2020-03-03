import React from "react";

const Note = ({ match, history, notes, deleteNote }) => {
  let currentNote = notes.find(note => note.id === +match.params.noteId);
  return (
    <main>
      <div className="note-header">
        <h3>{currentNote.notename}</h3>
        <time>
          {new Date(currentNote.modified).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
          })}
        </time>
        <button
          onClick={e => {
            e.preventDefault();
            deleteNote(currentNote.id);
            history.push("/");
          }}
        >
          Delete
        </button>
      </div>
      <p>{currentNote.content}</p>
    </main>
  );
};

export default Note;
