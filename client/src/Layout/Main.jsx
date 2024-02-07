import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import "../App.css";

const Main = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <footer>Footer</footer>
    </div>
  )
}

export default Main