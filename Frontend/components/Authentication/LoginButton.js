import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Button } from '@material-ui/core';
export const LoginButton = () => {

    const {loginWithRedirect} = useAuth0();
    return (
        <div>
           <Button
           onClick={()=>loginWithRedirect({screen_hint: 'signup'})}
           >Log in</Button> 
        </div>
    )
}
