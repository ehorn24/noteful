import React from "react";

const Note = ({ match, notes }) => {
  let currentNote = notes.filter(note => note.id === match.params.noteId);
  return (
    <main>
      <div className="note-header">
        <h3>{currentNote[0].name}</h3>
        <time>
          {new Date(currentNote[0].modified).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
          })}
        </time>
        <button>Delete</button>
      </div>
      <p>{currentNote[0].content}</p>
    </main>
  );
};

export default Note;
