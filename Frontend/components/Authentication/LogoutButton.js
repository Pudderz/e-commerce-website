import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Button } from '@material-ui/core';
export const LogoutButton = ({textStart}) => {

    const {logout} = useAuth0();

    return (
        
           <Button
           className={`logoutButton ${textStart && "start"}`}
           onClick={()=>logout({returnTo:window.location.origin})}
           >Log out</Button> 
        
    )
}
