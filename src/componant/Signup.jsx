import React, { useState } from 'react';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const  componentDyanamicTitle=()=> {
        document.title = "Ecom | Signup";
      }
      componentDyanamicTitle();

    const handleRegister = async (e) => {
        e.preventDefault();
        password === confirmPassword ? console.log("password matched") : console.log("password miamatched");
        try {
            const res = axios.post('http://localhost:10000/api/v1/user/register', {
                "username": username,
                "password": password,
                "email": email,
                "role": "admin",
                "address":
                {
                    "address": "123 Main St",
                    "city": "Anytown",
                    "state": "CA",
                    "zip": "12345"
                }
            })
            console.log(res.data);
            navigate("/login")
        } catch (error) {
            console.log(error);
        }

      


    };

    const signClickNavi = () => {
        navigate("/login")
    }
    return (

        <div className='login-container'>
            <div className='login-rows'>

                <div className="login-wrapper">
                    <div className='login-logo'>
                        {/* <img src={logo} height={70} width={80}></img> */}
                        <p>Let's Begain !!! </p>
                        <h2>Sign up</h2>
                    </div>
                    <form onSubmit={handleRegister}>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label>
                            <p>Confirm Password</p>
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </label>
                        <label>
                            <p>Email/Mobile No.</p>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <div>
                            <button type="submit">Sign up </button>
                        </div>
                        <div>
                            <p>Already have an account ? <span onClick={signClickNavi} className='btn-link-sign'>Sign in</span></p>
                        </div>
                    </form>
                </div>
                <div className='aside-wrapper'>

                </div>
            </div>
        </div>
    );
}

export default Register;