import React, { useState, createContext } from "react";
const AuthContext = createContext();
const AuthProvider = (props) => {
    const [authState, setAuthState] = useState({ isLogged: false });  
    return (    
        <AuthContext.Provider value={[authState, setAuthState]}>      
            {props.children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };