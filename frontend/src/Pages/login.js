import React, {useState} from "react";
import "./login.css";
import {Link} from 'react-router-dom'
import desktopLogo from "../images/social-desktop.PNG";
import mobileLogo from "../images/social-mobile.PNG";
import axios from "axios";
import  {API_URL} from '../config';
import swal from 'sweetalert2';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [loading, setLoading] = useState(false);
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const login = (e) => {
        e.preventDefault();
        if(email===" " || password===" "){
            swal.fire({
                icon:'error',
                title:'All fields are mandatory'
             })
        }
        else{
        setLoading(true);
        const requestData={email:email, password:password};
        axios.post(`${API_URL}/api/users/login`, requestData)
        .then((result)=>{
         if(result){
            setLoading(false);
         
            localStorage.setItem('id', JSON.stringify(result.data.id))
            localStorage.setItem("token", result.data.token)
            localStorage.setItem('user', JSON.stringify(result.data.result))
            
            dispatch({type:"LOGIN_SUCCESS", payload:result.data.result})
            navigate('/myProfile')
            swal.fire({
                icon:'success',
                title:'User successfully loggedin'
             })
           
         }

        })
        .catch((error)=>{
        console.log(error)
        setLoading(false);
        swal.fire({
            icon:'error',
            title:'User does`t exist'
         })
        })
    }
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-7 col-sm-12 d-flex justify-content-center">
                    <img className="desktoplogo " src={desktopLogo} style={{height:'66%'}} alt="logo" />
                    <img  className="mobileLogo d-sm-block d-md-none d-lg-none " src={mobileLogo} alt="logo" />
                </div>
                <div className="col-md-5 col-sm-12">
                    <div className="card shadow ">
                    {loading ? 
                            <div className="row ">
                                <div className="col-md-12 text-center mt-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                         : 
                            " "
                        }
                        <div className="card-body px-5">
                            <h4 className="card-title text-center mt-3 fw-bold">log in</h4>
                            <form onSubmit={(e)=>login(e)}>
                               <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control login-btn p-2 mt-4 mb-2" placeholder="Phone number, username or email"></input>
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control  login-btn p-2 mb-2" placeholder="Password"></input>
                                <div className="d-grid mt-3">
                                <button type="submit" className="custom-btn">log in</button>
                                </div>
                                <div className="my-4">
                                    <hr className="text-muted"/>
                                      <h6 className="text-muted text-center">OR</h6>
                                      <hr className="text-muted"/>
                                </div>
                              
                            </form>
                            <div className="d-grid mt-3">
                                <button  className="custom-btn-white shadow-sm">
                                    <span className="text-muted ">Don't have an account?
                                        <Link to="/signup" className="text-info ms-1 fw-bold">Sign Up</Link>
                                    </span>
                                </button>
                                
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
