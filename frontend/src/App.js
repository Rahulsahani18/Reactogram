import React, { useEffect } from 'react';  // Import React
import './App.css';
import Login from './Pages/login';
import Signup from './Pages/signup';
import NavBar from './components/NavBar';
import Posts from './components/postOverview';
import Profile from './Pages/profile';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  function DynamicRoute(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const user=useSelector(state=>state.userReducer);

useEffect(()=>{
const userData=JSON.parse(localStorage.getItem("user"));
if(userData){
  dispatch({type:"LOGIN_SUCCESS",payload:userData})
  navigate('/posts');
}else{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({type:"LOGIN_ERROR"});
  navigate('/login');
}
},[])
return(
  <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/posts' element={<Posts />} />
          <Route exact path='/myProfile' element={<Profile />} />
        </Routes>
)
  }

  return (
    <div className='app-body'>
      <Router>
        <NavBar />
        <DynamicRoute/>
      </Router>
    </div>
  );
}

export default App;
