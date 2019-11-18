import React from "react";

const Note = ({ match, notes }) => {
  let currentNote = notes.filter(note => note.id === match.params.noteId);
  return (
    <main>
      <h3>Note Content</h3>
      {currentNote[0].content}
    </main>
  );
};

export default Note;
