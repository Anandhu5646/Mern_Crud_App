import React from 'react'
import axios from 'axios'
import {BiSearch} from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './AdminHeader.css'
function AdminHeader({search ,setSearch}) {
  const dispatch = useDispatch();
  async function logout(){
    if(window.confirm("Are you sure want to logout?")){
      await axios.get("/admin/logout")
      dispatch({type:"refresh"})
    }
  }
  console.log(search);

  return (
    <div className='navBar'>
      <div className="navContainer">
        
        <div className="nav-sec 1">
          <div className="searchBox">
            <input type="text" placeholder='search user' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <BiSearch></BiSearch>
          </div>
          <Link to="/admin/createUser">
          <button className='btn btn-dark'>Create User</button>
          </Link>

        </div>
        <div className="nav-sec 2">
            <button className='btn btn-dark' onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
