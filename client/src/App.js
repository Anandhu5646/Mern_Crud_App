import UserLogin from './components/UserLogin/UserLogin';
import UserRegister from './components/UserRegister/UserRegister';
import UserHome from './components/UserHome/UserHome';
import EditUser from './components/EditUser/EditUser';
import CreateUser from './components/CreateUser/CreateUser';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminHome from './components/AdminHome/AdminHome';
import axios from 'axios';
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


function App() {
  axios.defaults.baseURL = "http://localhost:9000"
  axios.defaults.withCredentials = true

  const { user, admin, refresh } = useSelector((state) => {
    return state;
  })
  const dispatch = useDispatch()

  useEffect(() => {

    (async function () {
      let { data } = await axios.get('/checkAuth')
      dispatch({ type: 'user', payload: { login: data.loggedIn, details: data.user } })
      let { data: adminData } = await axios.get('/admin/checkAuth');
      dispatch({ type: 'admin', payload: { login: adminData.loggedIn } })
    })()
  },[refresh])
  console.log(user)
  return (

    <Router>
      <div className='App'>
        {
          user.login === false &&
          <Routes>
            <Route path='/login' element={<UserLogin />}></Route>
            <Route path='/register' element={<UserRegister />}></Route>
            <Route path='/' element={<Navigate to="/login" replace={true} />}></Route>
          </Routes>
        }
        {
          user.login === true &&
          <Routes>
            <Route path='/' element={<UserHome />}></Route>
            <Route path='/login' element={<Navigate to="/" replace={true} />}></Route>
            <Route path='/register' element={<Navigate to="/" replace={true} />}></Route>
          </Routes>
        }
        {
          admin.login === true &&
          <Routes>
            <Route path='/admin/' element={< AdminHome />}></Route>
            <Route path='/admin/createUser' element={<CreateUser />}></Route>
            <Route path='/admin/editUser/:id' element={<EditUser />}></Route>
            <Route path='/admin/*' element={<Navigate to='/admin/' replace={true} />}></Route>

          </Routes>
        }
        {
          admin.login === false &&
          <Routes>
            <Route path='/admin/login' element={< AdminLogin />}></Route>
            <Route path='/admin/*' element={< Navigate to='/admin/login' replace={true} />}></Route>
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
