import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserLoggedinData, { firebaseContext } from './usecontext/usecontexthelper';
import { firebaseInstance, auth, storage, db} from './firebase/firebase'

ReactDOM.render(

    <firebaseContext.Provider value={[firebaseInstance, auth, storage, db]}>
        <UserLoggedinData>
            <App />
        </UserLoggedinData>

    </firebaseContext.Provider>
    , document.getElementById('root'));
