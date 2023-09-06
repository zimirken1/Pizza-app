import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, PIZZA_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import myImage from '../logo.png';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white"}} to={PIZZA_ROUTE}>
                    <Image
                        src={myImage}
                        height={130}
                        width={240}
                    />
                </NavLink>
                {/*{user.isAdmin &&
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}
                        >
                            Админ-панель
                        </Button>
                    </Nav>
                }*/}
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {user.isAdmin &&
                            <Button
                                variant={"outline-light"}
                                className={"mx-lg-2"}
                                onClick={() => history(ADMIN_ROUTE)}
                            >
                                Админ-панель
                            </Button>
                        }
                        <Button
                            onClick={() => history(PROFILE_ROUTE + '/' + user._id)}
                            variant={"outline-light"}
                            className={"mx-lg-2"}
                        >
                            Личный кабинет
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className={"mx-lg-2"}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;