import React from 'react';
export default function NotesList({notes, onEdit, onDelete}){
  if(!notes.length) return <p>No notes yet.</p>;
  return (
    <div>
      {notes.map(n=>(
        <div key={n._id} style={{border:'1px solid #ddd', padding:12, marginBottom:8, borderRadius:6}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <strong>{n.title}</strong>
            <div>
              <button onClick={()=>onEdit(n)} style={{marginRight:8}}>Edit</button>
              <button onClick={()=>onDelete(n._id)}>Delete</button>
            </div>
          </div>
          <p style={{whiteSpace:'pre-wrap'}}>{n.body}</p>
          <small>Updated: {new Date(n.updatedAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
