import React from "react";
import { useContext, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import { Noteitem } from "./Noteitem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useState } from "react";

export const Notes = () => {
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "deafult",
  });
  const handleClick = (e) => {
    // console.log("Updating the note...",note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    // setnote({etitle:"",edescription:"",etag:""});
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    getNote();
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refclose = useRef(null);

  return (
    <>
      <AddNote />

      <button
        ref={ref}
        style={{ display: "none" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required

                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    cols="10"
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    cols="10"
                    value={note.etag}
                    name="etag"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                disabled={note.etitle.length<5 || note.edescription.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container">
          {notes.length === 0 && "No Notes to display !!"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem note={note} updateNote={updateNote} key={note._id} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
