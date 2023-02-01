import React from 'react'
// import Notes from './Notes'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useState } from 'react';

export const AddNote = () => {
  const [note, setnote] = useState({title:"",description:"",tag:""})

  const context=useContext(NoteContext);
  const {addNote}=context;

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""});
  }
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
    
    <div className='container my-3'>
        <h3>Add Notes</h3>
   <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5}
                    required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" cols="10" name='description' value={note.description} onChange={onChange} minLength={5}
                    required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" cols="10" name='tag' value={note.tag} onChange={onChange} minLength={5}
                    required/>
  </div>
  

  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>


    </div>
    </div>
  )
}

export default AddNote;