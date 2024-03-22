import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
const initialState = [{
  id:1,
  title: "Demo",
  content: "This is my first Note"
}]
function App() {
  const [notes, setNotes] = useState(initialState);
  const [editableNote, setEditableNote] = useState(null)
  function addNote(newNote) {
    setNotes([
      ...notes,
      {...newNote, id: notes.length+1}
    ]);
  }
  function deleteNote(id) {
    setNotes(notes.filter(v=>v.id !== id));
  }
  function updateNote(id){
    setEditableNote(notes.find(v=> v.id === id));
  }
   function update(note){
    const idx=notes.findIndex(n => n.id === note.id)
    const newNotes=[...notes]
    newNotes.splice(idx,1,note)
    setNotes(newNotes)
    setEditableNote(null)
   }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} edit={editableNote} update={update} />
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            editNote={updateNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
