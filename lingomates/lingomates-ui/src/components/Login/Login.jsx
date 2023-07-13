import "./Login.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode"
import axios from "axios"

export default function Login({setUserId, setLoggedIn, setLoginError}) {
  //states
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  //handleLogin
  const handleLogin = async (emailLogin, passwordLogin) => {
    let response = await axios.post("http://localhost:3001/auth/login", {
      emailLogin,
      passwordLogin,
    });

    console.log("What's in response: ", response)

    if(response.status === 200){
      setLoggedIn(true)
      setLoginError("") 

      const {token} = response.data
      localStorage.setItem("token", token); //adds token to localStorage by creating a "dictionary" where "token" = key and token = value
      const decodedToken = jwtDecode(token) //decodes token to human readable informtation where payload/data in token can be accessed
      setUserId(decodedToken.userId)  

    }else{
      console.log(response.data.message); //optional - display error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailLogin, passwordLogin);
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="logo" src="src/assets/snail.png" />
      </Link>
      <h2 className="greeting">Welcome</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="email-field"
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="password-field"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <div className="css-0">
        New to us?{" "}
        <a className="chakra-link css-c6nly4" href="/register">
          Sign Up
        </a>
      </div>
    </div>
  );
}
