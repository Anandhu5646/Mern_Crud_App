import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {FiEdit} from 'react-icons/fi'
import './UserHome.css'
import EditProfileModal from '../../modal/EditProfilePicture'

function UserHome() {
    const dispatch = useDispatch()
    async function logout() {
        if(window.confirm("Are you sure logout ")){
          
            await axios.get('/logout')
            dispatch({type:"refresh"})
        }
    }
    const user= useSelector((state) => {
        return state.user;
      });
      console.log(user)
  const [open, setOpen]=useState(false)
  const baseImgUrl="http://localhost:9000/images/"


    return (
      <div className="container d-flex justify-content-center">
      <div className="card p-3 py-4">
        <div className="text-center">
          <img
            src={baseImgUrl+user.details.profile}
            width={100}
            alt='profile-pic'
            className="rounded-circle"
          />
          <FiEdit className='profile-edit' onClick={()=>setOpen(true)}/>
          <h3 className="mt-2">{user.details.name}</h3>
          <span className="mt-1 clearfix">{user.details.proffession}</span>
          
          <span className="mt-1 clearfix">{user.details.about}</span>
              
           
          <hr className="line" />
         
          
          <div className="profile mt-5">
            <button className="profile_button px-5" onClick={logout}>Logout</button>
          </div>
        </div>
        <EditProfileModal open={open} id={user.details._id} setOpen={setOpen}/>
      </div>
    </div>
    

    )
}

export default UserHome