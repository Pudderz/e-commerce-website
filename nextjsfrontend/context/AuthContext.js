import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
  const { user,getAccessTokenSilently } = useAuth0();
    const [authState, setAuthState] = useState({
        token: null,
        expiresAt: null,
        userInfo: {}
    })

    const setAuthInfo = ({token, userInfo, expiresAt}) =>{
        setAuthState({
            token,
            userInfo,
            expiresAt,
        })
    }

    useEffect(()=>{
        (async () => {
        try {
          const token = await getAccessTokenSilently();
          console.log(token, getAccessTokenSilently());
          if (token) {
            setAuthState({...authState, token, userInfo: user});
            localStorage.setItem("token", token);
            
          }
        } catch (err) {
          console.log(err);
        }
      })();
      }, []);


    return (
        <AuthContext.Provider
        value={{
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
