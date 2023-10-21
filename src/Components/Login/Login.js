import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import {firebaseContext} from '../../usecontext/usecontexthelper';




function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [firebaseInstance, auth]= useContext(firebaseContext);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        alert("logged in")
        navigate("/")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='login'></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br/>
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }
            }
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }
            }
          />
          <br />
          <br />
          <button onClick={onLogin}>Login</button>
        </form>
        <NavLink to="/signup">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;
