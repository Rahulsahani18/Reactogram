import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import desktopLogo from "../images/social-desktop.PNG";
import mobileLogo from "../images/social-mobile.PNG";
import axios from "axios"
import  {API_URL} from '../config'
import swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();
        if(fullName===" " || email===" " || password===" "){
            swal.fire({
                icon:'error',
                title:'All fields are mandatory'
             })
        }  
        else{
        setLoading(true);
        const requestData={fullName:fullName, email:email, password:password};
        axios.post(`${API_URL}/api/users/signup`, requestData)
        .then((result)=>{
         if(result){
            setLoading(false);
            swal.fire({
                icon:'success',
                title:'User successfully registered'
             })
             navigate("/login");
         }
        
        })
        .catch((error)=>{
        console.log(error)
        setLoading(false);
        swal.fire({
            icon:'error',
            title:'Some error occured please try again later!'
         })
        })
     
    }
    };
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-7 col-sm-12 d-flex justify-content-center">
                    <img
                        className="desktoplogo "
                        src={desktopLogo}
                        style={{ height: "74%" }}
                        alt="logo"
                    />
                    <img
                        className="mobileLogo d-sm-block d-md-none d-lg-none "
                        src={mobileLogo}
                        alt="logo"
                    />
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
                            <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                            <form onSubmit={(e) => signUp(e)}>
                                <input
                                    type="text"
                                    className="form-control login-btn p-2 mb-2"
                                    placeholder="Phone number"
                                ></input>
                                <input
                                    type="email"
                                    // value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control login-btn p-2 mb-2"
                                    placeholder=" email"
                                ></input>
                                <input
                                    type="text"
                                    // value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="form-control login-btn p-2 mb-2"
                                    placeholder="Full Name"
                                ></input>
                                <input
                                    type="password"
                                    // value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control  login-btn p-2 mb-2"
                                    placeholder="Password"
                                ></input>
                                <div className="d-grid mt-3">
                                    <button type="submit" className="custom-btn">
                                        Sign Up
                                    </button>
                                </div>
                                <div className="my-4">
                                    <hr className="text-muted" />
                                    <h6 className="text-muted text-center">OR</h6>
                                    <hr className="text-muted" />
                                </div>
                               
                            </form>
                              
                            <div className="d-grid mt-3">
                                    <button className="custom-btn-white">
                                        <span className="text-muted ">
                                            Already have an account?
                                            <Link to="/login" className="text-info ms-1 fw-bold">
                                                Log In
                                            </Link>
                                        </span>
                                    </button>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
