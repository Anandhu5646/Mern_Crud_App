import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')



  const dispatch = useDispatch();
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === ""
    ) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validationErr()) {
      let { data } = await axios.post("/admin/login", {
        email,
        password
      });
      if (!data.error) {
        dispatch({type:"refresh"})
      } else {
        setErrMessage(data.message);
      }
    }
  }
  return (
    <div className="wrapper">
      <div className="card">
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="h3 text-center text-white mt-4">Admin Login</div>

          <div className="errorMsg">
            <label className="form-label text-danger" htmlFor="form2Example27">
              {errMessage && errMessage}
            </label>
          </div>
          <div className="d-flex align-items-center input-field my-3 mb-4 mx-5 mt-5">
            <span className="far fa-user p-2" />
            <input
              type="text"
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
              type="password"
              placeholder="Password"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="pwd"
            />
            <button className="btn" onclick="showPassword()">
              <span className="fas fa-eye-slash" />
            </button>
          </div>

          <div className="button my-3">
            <input value="Login" type="submit" disabled={validationErr()} className="btn btn-primary" />
          </div>
         
        </form>
      </div>
    </div>

  )
}

export default AdminLogin
