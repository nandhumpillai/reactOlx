import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseContext from './usecontext/usecontexthelper';
import {firebaseInstance, auth} from './firebase/firebase'

ReactDOM.render(

    <firebaseContext.Provider value={[firebaseInstance, auth]}>
        <App />
    </firebaseContext.Provider>
    , document.getElementById('root'));
