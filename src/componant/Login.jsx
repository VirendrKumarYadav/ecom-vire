import React, { useEffect, useState } from 'react';
// import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setLoginAuth } from '../redux/login/loginSlice'


function Login() {
    const naviagte = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   

    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:10000/api/v1/user/login', {
            "email": username,
            "password": password
        })

      const auth= res.data;
      console.log(auth);
        dispatch(setLoginAuth(auth))
        sessionStorage.setItem("auth",auth.token)
        naviagte("/")
    };

    const signClickNavi = () => {
        naviagte("/signup")
    }


    return (
        <div className='login-container'>
            <div className='login-rows'>

                <div className="login-wrapper">
                    <div className='login-logo'>
                        {/* <img src={logo} height={70} width={80}></img> */}
                        <p>Welcome Back !!! </p>
                        <h2>Sign in</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <div>
                            <button type="submit">Sign in </button>
                        </div>
                        <div>
                            <p>I don't have an account ? <span onClick={signClickNavi} className='btn-link-sign'>Sign Up</span></p>
                        </div>
                    </form>
                </div>
                <div className='aside-wrapper'>

                </div>
            </div>
        </div>
    );
}

export default Login;