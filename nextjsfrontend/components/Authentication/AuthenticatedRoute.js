import { Children, useContext } from "react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthenticatedRoute = ({ children }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const {user, isAuthenticated, isLoading} = useAuth0();


  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <div>{loginWithRedirect({screen_hint: 'signup'})}</div>
  );
};
