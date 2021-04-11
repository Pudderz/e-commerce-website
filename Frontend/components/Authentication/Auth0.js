import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from 'next/router';


// Requestd scopes does nothing atm
const requestedScopes = [
  'write:review',
  'write:product',
  'edit:stock',
  'edit:review',
  'view:ownOrder',
  'delete:ownReview',
  'read:allOrders'
];

export const Auth0 = (props) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const router = useRouter();
  const onRedirectCallback = (appState) => {
    // Use Next.js's Router.replace method to replace the url
    router.push(appState?.returnTo || '/');
  };

  return (
    <div>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={typeof window !== 'undefined' && window.location.origin}
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
