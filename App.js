import React, {useEffect, useState} from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import api from './api';
function App(){
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const fetchNotes = async ()=> {
    const res = await api.get('/notes');
    setNotes(res.data);
  };
  useEffect(()=>{ fetchNotes() },[]);
  const addNote = async (note)=>{ const res = await api.post('/notes', note); setNotes([res.data, ...notes]); };
  const updateNote = async (id, note)=>{ const res = await api.put(`/notes/${id}`, note); setNotes(notes.map(n=> n._id===id?res.data:n)); setEditing(null); };
  const deleteNote = async (id)=>{ await api.delete(`/notes/${id}`); setNotes(notes.filter(n=> n._id!==id)); };
  return (
    <div style={{maxWidth:800, margin:'20px auto', fontFamily:'Arial,Helvetica,sans-serif'}}>
      <h1>Note Maker</h1>
      <NoteForm onSubmit={addNote} editing={editing} onUpdate={updateNote} onCancel={()=>setEditing(null)} />
      <hr />
      <NotesList notes={notes} onEdit={setEditing} onDelete={deleteNote} />
    </div>
  );
}
export default App;
