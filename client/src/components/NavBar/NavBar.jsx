import React from 'react';
import {NavLink}  from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import style from './NavBar.module.css'

const NavBar = () => {
    return(
        <div className={style.navContainer}>
            <NavLink to={'/home'} className={style.navLink}>
                <button className={style.button}>HOME</button>
            </NavLink>
            <div>
                <NavLink to={'/'}>
                    <img src={logo} alt="dogs Logo" className={style.logo}/>
                </NavLink>
            </div>
            <NavLink to={'/form'} className={style.navLink}>
                <button className={style.button}>CREATE</button>
            </NavLink>
        </div>
    )
};

export default NavBar