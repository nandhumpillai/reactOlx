import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { firebaseContext, AuthContext } from '../../usecontext/usecontexthelper';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {useNavigate} from "react-router-dom"

const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState()
  const [firebaseInstance, auth, storage, db] = useContext(firebaseContext)
  const [user, setUser] = useContext(AuthContext)


  const navigate = useNavigate();

  const [progresspercent, setProgresspercent] = useState(0);

  const uploadData = (e) => {
    e.preventDefault()

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          try {
            const docRef = addDoc(collection(db, "products"), {
              name,
              category,
              price,
              imgUrl : downloadURL,
              userId : user.uid
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }).then(()=>navigate("/"));
      }
    );


  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
              onChange={(e) => {
                setPrice(e.target.value)
              }} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input type="file"
              onChange={(e) => {
                setImage(e.target.files[0])
              }} />
            <br />
            <button className="uploadBtn" onClick={uploadData}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
