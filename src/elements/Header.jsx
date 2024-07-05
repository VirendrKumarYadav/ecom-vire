import React, { useEffect } from 'react';
import { GoHome } from "react-icons/go";
import { TiShoppingCart } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import '../css/header.css';
import { useSelector } from 'react-redux';
import { IoMdLogIn } from "react-icons/io";
import Tooltip from '@mui/material/Tooltip';
import { Button, Grid } from '@mui/material';
import { FaLink } from "react-icons/fa6";


const Header = () => {
    let auth = useSelector((state) => state.setLoginAuth);
    const navigate = useNavigate();

    useEffect(() => {
        auth = sessionStorage.getItem("auth");
        console.log(auth);

    }, [])


    return (
        <header>
            <div className='logo'>
                <img src={logo} height={50} width={50} alt="Logo" />
                <span>Ecom</span>
            </div>
            <div className='listDev'>
                <nav>
                    <ul className='nav-list login-list'>
                        {
                            <>
                                <Grid item>
                                    <Tooltip title="Login" placement='top'>
                                        <Button onClick={() => { navigate("/login") }}><IoMdLogIn size={30} /></Button>
                                    </Tooltip>
                                </Grid>

                                <Grid item>
                                    <Tooltip title="Home" placement='top'>
                                        <Button onClick={() => { navigate("/") }}><GoHome size={30} /></Button>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Shopping Cart" placement='top'>
                                        <Button onClick={() => { navigate("/cart") }}><TiShoppingCart size={30} /></Button>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="About Ecom" placement='top'>
                                        <Button onClick={() => { navigate("/about") }}><IoDocumentTextOutline size={30} /></Button>
                                    </Tooltip>
                                </Grid>

                                <Grid item>
                                    <a href='https://github.com/VirendrKumarYadav/ecom-vire'>
                                    <Tooltip title="Project Link" placement='top'>
                                     <Button ><FaLink size={30} /></Button>
                                    </Tooltip>
                                    </a>
                                </Grid>
                            </>
                        }

                    </ul>
                    
                </nav>
            </div>
        </header>
    );
};

export default Header;
