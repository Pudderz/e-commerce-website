import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { LoginButton } from '../components/LoginButton'
import { LogoutButton } from '../components/LogoutButton'

export const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0()
console.log(user)
    return (
        <div>
            {isAuthenticated ?(
                <div>
                    <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            {user?.email_verified === false? (
                <a>Verifiy Email</a>
            ):(
                <p>Email verified</p>
            )}
            {JSON.stringify(user,null,2)}
            <LogoutButton/>
                </div>
            ):(
                <LoginButton/>   
            )}
            
         
        
        </div>
    )
}
