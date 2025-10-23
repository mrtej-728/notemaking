import React, {useState, useEffect} from 'react';
export default function NoteForm({onSubmit, editing, onUpdate, onCancel}){
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(()=>{ if(editing){ setTitle(editing.title); setBody(editing.body); } },[editing]);
  const submit = (e)=>{ e.preventDefault(); if(editing){ onUpdate(editing._id, {title, body}); } else { onSubmit({title, body}); setTitle(''); setBody(''); } };
  return (
    <form onSubmit={submit} style={{marginBottom:16}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required style={{width:'100%', padding:8, marginBottom:8}} />
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" required style={{width:'100%', padding:8, minHeight:100}} />
      <div style={{marginTop:8}}>
        <button type="submit">{editing? 'Update' : 'Add Note'}</button>
        {editing && <button type="button" onClick={onCancel} style={{marginLeft:8}}>Cancel</button>}
      </div>
    </form>
  );
}
