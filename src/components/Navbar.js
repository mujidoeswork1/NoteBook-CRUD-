import React from 'react'
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"





export const Navbar = () => {

    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname)
    // }, [location]);

  return (
    <nav className="navbar navbar-expand-lg  bg-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="#">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""} text-white`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""} text-white`} to="/about">About</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/">Action</Link></li>
            <li><Link className="dropdown-item" to="/">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="/">Something else here</Link></li>
          </ul>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link disabled" to="/">Disabled</Link>
        </li> */}
      </ul>
      <form className="d-flex" role="search">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Log in</Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
      </form>
    </div>
  </div>
</nav>
  )
}
