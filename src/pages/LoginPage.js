import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

// Login section
// Register Scetion

export const LoginPage = () => {
  return (
      <>
      <Header/>
    <div>
        
      <form>
        <h3>Login</h3>
        <label>
          Username or Email Address *
          <input type="text" />
        </label>
        <label>
          Password *
          <input type="password" />
        </label>
        <label>
          <input type="checkbox" />
          Remember Me
        </label>
        <button type="submit">LOG IN</button>
        <a href="">Forgotten your password?</a>
      </form>
      <form>
        <h3>Refister</h3>
        <label>
          Email Address *
          <input type="text" />
        </label>
        <p>A password will be sent to your email address.</p>
        <p>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>
        <button type="submit"> REGISTER</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};
