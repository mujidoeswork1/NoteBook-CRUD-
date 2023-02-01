import { useContext } from "react"
import React from 'react'
import NoteContext from "../context/notes/NoteContext"
import { useEffect } from "react"

export const About = () => {
    const a=useContext(NoteContext);
    // useEffect(() => {
      
    //   return () => {
    //     a.update();
    //   }
    // }, [])
    
    
  return (
    <div className="px-3">this is about muji</div>
  )
}
