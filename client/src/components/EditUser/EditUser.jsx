import React, { useEffect, useState } from "react";
import "../UserLogin/UserLogin.css";


import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const [name, setName] = useState("");
  const [proffession, setProffession] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage]=useState(null)
  const navigate= useNavigate()
  const {id}=useParams()
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      about.replaceAll(" ", "") === "" ||
      proffession.replaceAll(" ", "") === "" ||
      name.replaceAll(" ", "") === ""
    ) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validationErr()) {
      let {data}=await axios.post("/admin/editUser", {
        name, email, about, proffession,id
      });
      if(!data.error){
          return navigate("/admin/")
      }else{
        setErrMessage(data.message)
      }
    }
  }
  useEffect(()=>{  
    (async function(){
        console.log(id)
        let {data}=await axios.get("/admin/users/"+id)
        
       if(data.user){

         setName(data.user.name)
         setEmail(data.user.email)
         setProffession(data.user.proffession)
         setAbout(data.user.about)
       }
        
    })()

  },[id])
  return (
    <div className="wrapper">
      <div className="card">
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="h3 text-center text-white mt-4">Update User</div>

          <div className="errorMsg">
            <label className="form-label text-danger" htmlFor="form2Example27">
              {errMessage && errMessage}
            </label>
          </div>

          <div className="d-flex align-items-center input-field mb-2 mx-5 my-5">
            <span className="fas fa-lock p-2" />
            <input
              type="text"
              placeholder="Name"
              required=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              
            />
          </div>

          <div className="d-flex align-items-center input-field my-3 mb-4 mx-5 ">
            <span className="far fa-user p-2" />
            <input
              type="email"
              placeholder="Email"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="d-flex align-items-center input-field mb-4 mx-5">
            <span className="fas fa-lock p-2" />
            <input
              type="text"
              placeholder="Profession"
              required=""
              value={proffession}
              onChange={(e) => setProffession(e.target.value)}
              className="form-control"
              
            />
          </div>
          <div className="d-flex align-items-center input-field mb-4 mx-5">
            <span className="fas fa-lock p-2" />
            <input
              type="text"
              placeholder="About"
              required=""
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="form-control"
              
            />
          </div>
        

          <div className="button my-3">
            <input value="Update" type="submit" disabled={validationErr()}
             className="btn btn-primary" />
          </div>
         
        </form>
      </div>
    </div>
  );
}

export default EditUser;
