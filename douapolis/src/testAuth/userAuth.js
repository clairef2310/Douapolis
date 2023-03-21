import React, { useState, createContext } from "react";
const UserContext = createContext();
const UserProvider = (props) => {
    const [userState, setUserState] = useState({ userLogged: "" });  
    return (    
        <UserContext.Provider value={[userState, setUserState]}>      
            {props.children}
        </UserContext.Provider>
    );
};
export { UserContext, UserProvider };