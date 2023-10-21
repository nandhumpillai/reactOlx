import React, { useContext, useEffect  } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Components/Login/Login';
import { AuthContext, firebaseContext } from './usecontext/usecontexthelper'
import CreatePage from './Pages/Create';


function App() {

  const [loggedinUser, setLoggedinUser] = useContext(AuthContext)
  const [firebaseConfig, auth] = useContext(firebaseContext);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setLoggedinUser(user)
          console.log(user)
          console.log("main check user logged in");
        } else {
          // User is signed out
          // ...
          console.log("main check user is logged out")
        }
      });
     
  }, [])
  

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/sell" element={<CreatePage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
