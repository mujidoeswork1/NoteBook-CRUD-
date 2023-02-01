import { useState } from "react";
import React from 'react'

export const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiY2I5MTBiZGM5ZjMxOGJmZDI1NTE1In0sImlhdCI6MTY1NjU3ODA3NX0.Xp2fXi60-kT4rcs_6CAYjPgSgoueTYTHI7_JXhIpE8s",
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })

          });
        const json = await response.json();
        console.log(json)

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div>

<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" onChange={onChange}  value={credentials.email} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control"  onChange={onChange} value={credentials.password} id="password" name='password' placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary my-2" >Submit</button>
</form>
    
    </div>
  )
}
