import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, PIZZA_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import './NavBar.css'
import {FiLogOut, FiUser} from "react-icons/fi";
import {MdOutlineAdminPanelSettings} from "react-icons/md";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }
    return (
        <header className={"navbar"}>
            <NavLink to={'/about'} className={"navbar__logo"}>
                PIZZERIA
            </NavLink>
            <div className={"navbar-links"}>
                <NavLink to={'/about'} className={"navbar-links__link"}>
                    Главная
                </NavLink>
                <NavLink to={'/'} className={"navbar-links__link"}>
                    Меню
                </NavLink>
                <NavLink to={'/'} className={"navbar-links__link"}>
                    О продукте
                </NavLink>
                <NavLink to={'/'} className={"navbar-links__link"}>
                    Контакты
                </NavLink>
            </div>

            {user.isAuth ?
                <div className={"navbar-btns"}>
                    {user.isAdmin &&
                        <div
                            className={"navbar-btn__text"}
                            onClick={() => history(ADMIN_ROUTE)}
                        >
                            <MdOutlineAdminPanelSettings size={25}/>
                        </div>
                    }
                    <div
                        onClick={() => history(PROFILE_ROUTE + '/' + user._id)}
                        className={"navbar-btn__text"}
                    >
                        <FiUser size={25}/>
                    </div>
                    <div
                        onClick={() => {logOut(); history('/about');}}
                        className={"navbar-btn__text"}
                    >
                        <FiLogOut size={25}/>
                    </div>
                </div>
                :
                <div className={"navbar-btn"}>
                    <NavLink to={'/login'} className={"navbar-btn__text"}>
                        Войти
                    </NavLink>
                </div>
            }

        </header>
    );
});

export default NavBar;