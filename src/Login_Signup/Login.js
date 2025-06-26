import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginuser, setLoginuser] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginuser({
      ...loginuser,
      [name]: value,
    });
  };

  const validateLogin = () => {
    const { email, password } = loginuser;
    let newError = { ...loginError };
    let isValid = true;

    if (!email) {
      newError.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Email format is invalid';
      isValid = false;
    } else {
      newError.email = '';
    }

    if (!password) {
      newError.password = 'Password is required';
      isValid = false;
    } else {
      newError.password = '';
    }

    setLoginError(newError);
    return isValid;
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();

    if (!validateLogin()) {
      return;
    }

    try {
    const response = await axios.post('https://chatbuddy-backend-1.onrender.com/api/users/login', loginuser);

    const { token, user } = response.data;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));

    navigate('/dashboard');
  } catch (error) {
    alert('Login failed!');
  }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center px-0" style={{ height: '100vh', backgroundColor: '#cfdecc' }}>
        <div className="row w-75 container d-flex px-0" style={{ height: '80%', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)', borderRadius: '15px' }}>
          <div className="col-lg-6 col-md-6 col-sm-12 order-sm-0 d-flex justify-content-center flex-column">
            <h1 className="text-center d-sm-none mb-3" style={{ color: '#4B5945', fontWeight: 'bold' }}>ChatBuddy</h1>
            <h1 className="text-center mb-4" style={{color:'#4B5945', fontWeight: 'bold'}}>Login</h1>
            {/* <div className="d-flex justify-content-center flex-wrap mt-4">
              <FontAwesomeIcon icon={faGoogle} size="2x" />
              <FontAwesomeIcon icon={faFacebook} size="2x" className="ms-3" />
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="ms-3" />
            </div> */}
            {/* <p className="text-center">Use your account</p> */}
            <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleLoginSubmit}>
              <div className="mb-3 m-auto" style={{ width: '80%' }}>
                <input
                  type="email"
                  className={`form-control ${loginError.email ? 'is-invalid' : ''}`}
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Email address"
                  onChange={handleInputChange}
                />
                {loginError.email && <div className="invalid-feedback">{loginError.email}</div>}
              </div>
              <div className="mb-3 m-auto" style={{ width: '80%' }}>
                <input
                  type="password"
                  className={`form-control ${loginError.password ? 'is-invalid' : ''}`}
                  name="password"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
                {loginError.password && <div className="invalid-feedback">{loginError.password}</div>}
              </div>
              <p className='mt-2'>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
              {/* <a className="text-center mb-3" style={{ color: '#66785F' }}>
                Forgot your password?
              </a> */}
              <button className="btn mx-auto text-white" style={{ width: '35%', borderRadius: '25px', backgroundColor: '#4B5945' }}>
                Login
              </button>
            </form>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 order-sm-1 d-none d-sm-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#4B5945' }}>
            <h2 className="text-white">Hello, Friend!</h2>
            <div className="text-center mt-2" style={{ width: '75%' }}>
              <p className="text-white" style={{ fontSize: '17px' }}>
                Enter your personal details and start journey with us
              </p>
            </div>
            <button className="btn text-white mt-1 p-1" onClick={() => navigate('/signup')} style={{ border: '1px solid white', borderRadius: '25px', width: '35%' }}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;