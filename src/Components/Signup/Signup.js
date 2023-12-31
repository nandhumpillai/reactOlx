import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { collection, addDoc } from "firebase/firestore";
import { firebaseContext } from '../../usecontext/usecontexthelper';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


export default function Signup() {

  const navigate = useNavigate();

  const [fname, setFname] = useState('')
  const [uemail, setuemail] = useState('')
  const [uphone, setuphone] = useState('')
  const [password, setpassword] = useState('')
  const [displayName, setDisplayname] = useState('')
  const [firebaseConfig, auth, storage, db] = useContext(firebaseContext);

  const Signup = async (e) => {
    e.preventDefault()
    //console.log(firebaseConfig);
    await createUserWithEmailAndPassword(auth, uemail, password)
      .then((userCredential) => {
        addDoc(collection(db, "users"), {
          fname: fname,
          uemail: uemail,
          uphone: uphone,
          userId: userCredential.user.uid,
        });
      })
        // Signed in

        navigate("/")
        // ...
      }

  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='login'></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={fname}
            placeholder='first name'
            onChange={(e) => setFname(e.target.value)}
          />
          <br />
          <label htmlFor="uemail">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="uemail"
            name="email"
            placeholder='email id'
            value={uemail}
            onChange={(e) => setuemail(e.target.value)}
          />
          <br />
          <label htmlFor="uphone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="uphone"
            name="phone"
            placeholder='phone number'
            value={uphone}
            onChange={(e) => setuphone(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder='password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={Signup}>Signup</button>
        </form>
        <p onClick={()=>navigate("/login")}>Login</p>
      </div>
    </div>
  );
}
