import React from "react";
import NoteContext from "./notes/NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http//:localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  //GET ALL notes

  const getNote = async () => {
    //API

    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiY2I5MTBiZGM5ZjMxOGJmZDI1NTE1In0sImlhdCI6MTY1NjU3ODA3NX0.Xp2fXi60-kT4rcs_6CAYjPgSgoueTYTHI7_JXhIpE8s",
      },
    });
    const json = await response.json();
    // console.log(json);
    setnotes(json);
    // console.log(response)
  };

  //Add note

  const addNote = async (title, description, tag) => {
    //API

    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiY2I5MTBiZGM5ZjMxOGJmZDI1NTE1In0sImlhdCI6MTY1NjU3ODA3NX0.Xp2fXi60-kT4rcs_6CAYjPgSgoueTYTHI7_JXhIpE8s",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note= await response.json();
    setnotes(notes.concat(note));

    // add
    // console.log("Adding a new note");
    // let note = json;
    // setnotes(notes.concat(note));
  };

  //Delete note

  const deleteNote = async (id) => {
    //API

    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiY2I5MTBiZGM5ZjMxOGJmZDI1NTE1In0sImlhdCI6MTY1NjU3ODA3NX0.Xp2fXi60-kT4rcs_6CAYjPgSgoueTYTHI7_JXhIpE8s"
      },
      // body: JSON.stringify({ title, description, tag }),
    });
    const json=response.json();
    // console.log(json);



    //deleteing
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit note

  const editNote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiY2I5MTBiZGM5ZjMxOGJmZDI1NTE1In0sImlhdCI6MTY1NjU3ODA3NX0.Xp2fXi60-kT4rcs_6CAYjPgSgoueTYTHI7_JXhIpE8s",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))

    //login to edit client notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
