import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";


const requestedScopes = [
  'write:review',
  'read:review',
];


export const Auth0 = (props) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };


  return (
    <div>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        scope={requestedScopes.join(' ')}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        responseType={'token id_token'}
      >
        {props.children}
      </Auth0Provider>
    </div>
  );
};
