import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { useRouter } from "next/router";
const Redirecting = () => {
  return <div>Redirecting you to the login page...</div>;
};

const AuthenticatedRoute = ({ children }) => {
  const router = useRouter();

//   const { user, getIdTokenClaims } = useAuth0();

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // temp using access token. Will move to id token in future
  const getToken = async () => {
    // const claims = await getIdTokenClaims();

    let token = localStorage.getItem("token");

    if (token) {
      const decodeToken = JSON.parse(atob(token.split(".")[1]));
      if (decodeToken.permissions.includes("write:product")) {
        setVerified(true);
      }

    }
    // console.log(JSON.parse(atob(claims.__raw.split(".")[1])));
    // console.log(user);
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!loading && !verified) {
    router.push("/");
    return <div></div>;
  }

  if (!loading && verified) {
    return <div>{children}</div>;
  }

  return <Redirecting />;
};

export default withAuthenticationRequired(AuthenticatedRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => Redirecting,
});
