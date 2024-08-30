import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Login from "./components/Login";
import Register from "./components/Register"; // Assuming you have a Register component
import { auth, db } from "./config/firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [notes, setNotes] = useState([]);
  const [editableNote, setEditableNote] = useState(null);
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchNotes(currentUser.uid);
      } else {
        setNotes([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchNotes = async (userId) => {
    const notesCollectionRef = query(collection(db, "notes"), where("userId", "==", userId));
    const data = await getDocs(notesCollectionRef);
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addNote = async (newNote) => {
    const noteWithUser = { ...newNote, userId: user.uid };
    const docRef = await addDoc(collection(db, "notes"), noteWithUser);
    setNotes([...notes, { ...noteWithUser, id: docRef.id }]);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id) => {
    setEditableNote(notes.find((note) => note.id === id));
  };

  const update = async (note) => {
    const noteDoc = doc(db, "notes", note.id);
    await updateDoc(noteDoc, {
      title: note.title,
      content: note.content,
    });
    setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    setEditableNote(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      {user ? (
        <>
          <CreateArea onAdd={addNote} edit={editableNote} update={update} />
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
              editNote={updateNote}
            />
          ))}
        </>
      ) : isRegistering ? (
        <Register onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <Login onSwitchToRegister={handleSwitchToRegister} />
      )}
      <Footer />
    </div>
  );
}

export default App;
