import React, { useState } from 'react';
import LoginPage, { Username, Password, TitleSignup, TitleLogin, Submit, Logo } from '@react-login-page/page8';
import axios from 'axios';
import LoginLogo from 'react-login-page/logo-rect';
import { toast } from 'react-toastify';

const FirstPage = ({setAuth}) => {
  const [signupPassword, setSignupPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        
          email: signupEmail,
          password: signupPassword,
          username :signupEmail,
        
      });
      console.log('User created:', response.data);
      toast.success("User created Successfully, Kindly Log In");
    } catch (error) {
      console.error('There was an error creating the user!', error);
      toast.error("User Already Present !! kindly log In");
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        signInEmail,
        signInPassword,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setAuth(true); 
      console.log('Logged in successfully:', response.data);
      toast.success("logged in successfully!! ");

    } catch (error) {
      console.error('Login failed:', error);
      toast.error("Error in Login! Register or Login Again!");
    }
  };
 
  return  (
    <div style={{height:'100vh', width: '100vw'}}>
      <LoginPage showHeader={false}>
        <Logo>
          <LoginLogo />
        </Logo>
        <TitleSignup>Sign Up</TitleSignup>
        <TitleLogin>Login</TitleLogin>
        
        <Username label="email" placeholder="Email" name="userEmail" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)}/>
        <Password label="password" placeholder="Password" name="userPassword" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)}/>
        <Submit keyname="submit" onClick={handleLogin}>Sign In</Submit>

        <Username panel="signup" label="email" placeholder="E-mail" keyname="e-mail"  value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />

        <Password panel="signup" label="Password" placeholder="password" keyname="password" value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}/>
        <Password panel="signup" label="re-enter Password" placeholder="re-enter Password" keyname="confirm-password" />
        <Submit panel="signup" keyname="signup-submit" onClick={handleSignUp}>
          Sign Up
        </Submit>
        
      </LoginPage>
    </div>
  )
};

export default FirstPage;