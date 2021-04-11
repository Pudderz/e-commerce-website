import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { createUploadLink } from "apollo-upload-client";


const uploadLink = createUploadLink({
    uri: `${process.env.BACKEND_SERVER}/graphql`,
  });


const AuthApolloWrapper = ({ children }) => {
  const [token, setToken] = useState("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();


    useEffect(() => {

    (async () => {
      try {
        const accessToken = (isAuthenticated)? await getAccessTokenSilently(): "";

        setToken(accessToken);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);


  const authLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if(token){
      operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    }
    

    return forward(operation);
  });

  const apolloClient = new ApolloClient({
    link: concat(authLink, uploadLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
};

export default AuthApolloWrapper;