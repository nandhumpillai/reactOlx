import React, {useState} from 'react';

// Creating the context object and passing the default values.
export const firebaseContext = React.createContext(null);

export const AuthContext = React.createContext(null);

export default function UserLoggedinData({children}){

    const [loggedinUser, setLoggedinUser]  = useState(null)
    return(

        <AuthContext.Provider value={[loggedinUser, setLoggedinUser] }>
            {children}
        </AuthContext.Provider>

    )

}