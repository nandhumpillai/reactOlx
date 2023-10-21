import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { firebaseContext, AuthContext } from '../../usecontext/usecontexthelper';


function Header() {

  const navigate = useNavigate();

  const [firebaseInstance, auth, storage, db] = useContext(firebaseContext)
  const [loggedinUser, setLoggedinUser] = useContext(AuthContext)

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setLoggedinUser()
      alert("logged out successfully")
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => navigate("/")}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={() => {
            if (loggedinUser)
              handleLogout()
            else
              navigate("/login")
          }}>{loggedinUser ? "logout" : "Login"}</span>
          <hr />
        </div>

        <div className="sellMenu" onClick={() => navigate("/sell")}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
