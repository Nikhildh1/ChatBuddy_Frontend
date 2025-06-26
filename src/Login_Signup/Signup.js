import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        "name": "",
        "email": "",
        "password": ""
    });

    const [signuperror, setsignuperror] = useState({
        name: "",
        email: "",
        password: ""
    });

    const validatesignup = () => {
        const { name, email, password } = user;
        let newerror = { ...signuperror };
        let isvalid = true;

        if (!name) {
            newerror.name = "Name is required";
            isvalid = false;
        } else {
            newerror.name = "";
        }

        if (!email) {
            newerror.email = "Email is required";
            isvalid = false;
        } else {
            newerror.email = "";
        }

        if (!password) {
            newerror.password = "Password is required";
            isvalid = false;
        } else if (password.length < 6) {
            newerror.password = "Password should contain at least six characters";
            isvalid = false;
        } else {
            newerror.password = "";
        }

        setsignuperror(newerror);
        return isvalid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        // Validate the form before proceeding
        if (!validatesignup()) {
            return; // If validation fails, prevent further action
        }
    
        try {
    await axios.post('http://localhost:8080/api/users/signup', user);
    alert("Signup successful! Please login.");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data || "Signup failed!");
  }
    };


    return (
        <div className='container-fluid d-flex justify-content-center align-items-center px-0' style={{ height: '100vh', backgroundColor: '#cfdecc' }}>
            <div className='row w-75 container d-flex px-0' style={{ height: '80%', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)', borderRadius: '15px' }}>
                <div className="col-lg-6 col-md-6 col-sm-12 d-none d-sm-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#4B5945' }}>
                    <h2 className='text-white'>Welcome Back!</h2>
                    <div className="text-center mt-1" style={{ width: '75%' }}>
                        <p className='text-white' style={{ fontSize: '17px' }}>To keep connected with us, please login with your personal info</p>
                    </div>
                    <button className='btn text-white p-1' onClick={() => navigate('/login')} style={{ border: '1px solid white', borderRadius: '25px', width: '35%' }}>LOGIN</button>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center flex-column'>
                    <h1 className="text-center d-sm-none mb-3" style={{ color: '#4B5945', fontWeight: 'bold' }}>ChatBuddy</h1>
                    <h1 className='text-center mb-4' style={{color:'#4B5945',fontWeight: 'bold'}}>Sign Up</h1>
                    {/* <div className='d-flex justify-content-center flex-wrap mt-3'>
                        <FontAwesomeIcon icon={faGoogle} size='2x' />
                        <FontAwesomeIcon icon={faFacebook} size='2x' className='ms-3' />
                        <FontAwesomeIcon icon={faLinkedin} size='2x' className='ms-3' />
                    </div> */}
                    {/* <p className='text-center'>se your email for registration</p> */}
                    <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
                        <div className="mb-3 m-auto" style={{ width: '80%' }}>
                            <input type="text" className={`form-control ${signuperror.name ? "is-invalid" : ""}`} name='name' placeholder='Name' onChange={handleInputChange} />
                            {signuperror.name && <div className="invalid-feedback">{signuperror.name}</div>}
                        </div>
                        <div className="mb-3 m-auto" style={{ width: '80%' }}>
                            <input type="email" className={`form-control ${signuperror.email ? "is-invalid" : ""}`} name='email' placeholder='Email address' onChange={handleInputChange} />
                            {signuperror.email && <div className="invalid-feedback">{signuperror.email}</div>}
                        </div>
                        <div className="mb-2 m-auto" style={{ width: '80%' }}>
                            <input type="password" className={`form-control ${signuperror.password ? "is-invalid" : ""}`} name='password' placeholder='Password' onChange={handleInputChange} />
                            {signuperror.password && <div className="invalid-feedback">{signuperror.password}</div>}
                        </div>
                        <p className='mt-2'>Already have an account? <Link to={"/login"}>Login</Link></p>
                        {/* <a className='text-center mb-2' style={{ color: '#66785F'}}>Forgot your password?</a> */}
                        <button className='btn mx-auto text-white mt-2' style={{ width: '35%', borderRadius: '25px', backgroundColor: '#4B5945' }}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;