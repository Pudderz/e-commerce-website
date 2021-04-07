import React from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';

const Redirecting = () =>{
  return(
    <div>Redirecting you to the login page...</div>
  )
} 


const AuthenticatedRoute = ({ children }) => {

  return (
    <div>{children}</div>
  ) 
};



export default withAuthenticationRequired(AuthenticatedRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (Redirecting)
});
