import React from 'react'
import './NavBar.css'
import logo from '../images/logo.PNG'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer);
  // console.log(user)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5 " to='posts'>
            <img alt='logo' src={logo} style={{ height: "40px", marginTop: "5px" }} />
          </NavLink>
          <form className="d-flex me-md-5" role='search'>
            <input className="searchbox form-control me-2 text-muted" type="search" placeholder="Search" />
            <a className='nav-link text-dark fs-5 search-icon '><i className="fa-solid fa-magnifying-glass "></i></a>
            {user.user ? <NavLink className='nav-link text-dark fs-5' to='posts'><i className="fa-solid fa-house"></i></NavLink> : ''}
            {user.user ? <a className='nav-link text-dark fs-5' ><i className="fa-solid fa-heart" ></i></a> : ''}
            {user.user ? <div className="dropdown " >
              <> <a type="button" className="btn " data-bs-toggle="dropdown">
                <img className='navbar-profile-pic' alt='profile pic' src='https://media.istockphoto.com/id/1438437093/photo/young-adult-woman-in-studio-shots-making-facial-expressions-and-using-fingers-and-hands.webp?b=1&s=170667a&w=0&k=20&c=s64r95WyPrrg3nEc8X33TqYKIyJiyrj2tu4dRUds_-Y=' />
              </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className=' text-dark dropdown-item ' to='/myProfile' >My profile</NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => logout()} href="#">
                      Log Out
                    </a>
                  </li>
                </ul> </>
            </div> : ''}
          </form>
        </div>
      </nav>
    </div>
  )
}

export default NavBar