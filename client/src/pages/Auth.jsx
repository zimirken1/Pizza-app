import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [usernameDirty, setUsernameDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [addressDirty, setAddressDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [usernameError, setUsernameError] = useState('поле не может быть пустым')
    const [passwordError, setPasswordError] = useState('поле не может быть пустым')
    const [addressError, setAddressError] = useState('поле не может быть пустым')
    const [phoneError, setPhoneError] = useState('поле не может быть пустым')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (usernameError || passwordError || addressError || phoneError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [usernameError, passwordError, addressError, phoneError])
    const usernameHandler = (e) => {
        setUsername(e.target.value)
        const re = /^[a-z][a-z0-9-]*$/i
        if (!re.test(String(e.target.value))) {
            setUsernameError('Некорректное имя пользователя')
        } else {
            setUsernameError("")
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setPasswordError('Пароль должен содержать не менее 8 символов')
        } else {
            setPasswordError('')
        }
    }
    const addressHandler = (e) => {
        setAddress(e.target.value)
        if (e.target.value.length < 10) {
            setAddressError('Некорректный адрес')
        } else {
            setAddressError('')
        }
    }
    const phoneHandler = (e) => {
        setPhone(e.target.value)
        const re = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/
        if (!re.test(String(e.target.value))) {
            setPhoneError('Некорректный номер телефона')
        } else {
            setPhoneError("")
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsernameDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'address':
                setAddressDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            default: break
        }
    }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(username, password)
            } else {
                data = await registration(username, password, address, phone)
            }
            user.setUser(data)
            user.setIsAuth(true)
            if (data.roles.includes('Admin')) {
                user.setIsAdmin(true)
            }
            console.log(user.isAdmin)
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (// <Container
        //     className={"d-flex justify-content-center align-items-center"}
        //     style={{height: window.innerHeight - 54}}
        // >
        //     <Card style={{width: 600}} className={"p-5"}>
        //         <h2 className={"m-auto"}>{isLogin ? "Авторизация" : "Регистрация"}</h2>
        //         <Form className={"d-flex flex-column"}>
        //             <Form.Control
        //                 className={"mt-3"}
        //                 placeholder={"Введите ваш login..."}
        //                 value={username}
        //                 onChange={e => setUsername(e.target.value)}
        //             />
        //             <Form.Control
        //                 className={"mt-3"}
        //                 placeholder={"Введите пароль..."}
        //                 value={password}
        //                 onChange={e => setPassword(e.target.value)}
        //                 type={"password"}
        //             />
        //             <Row className={"d-flex justify-content-between mt-3 pl-3 pr-3"}>
        //                 {isLogin ?
        //                     <div>
        //                         Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
        //                     </div>
        //                     :
        //                     <div>
        //                         Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
        //                     </div>
        //                 }
        //                 <Button
        //                     variant={"outline-success"}
        //                     onClick={click}
        //                 >
        //                     {isLogin ? 'Войти' : 'Регистрация'}
        //                 </Button>
        //             </Row>
        //         </Form>
        //     </Card>
        // </Container>
        <Container
            className={"d-flex justify-content-center align-items-center"}
        >
            {isLogin ? <Card
                style={{width: 600}} className={"p-5 mt-5"}
            >
                <h2 className={"m-auto"}>Авторизация</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Введите логин"}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Введите пароль"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                    <Row className={"d-flex justify-content-between mt-3 pl-3 pr-3"}>
                        {isLogin ? <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div> : <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>}
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card> : <Card
                style={{width: 600}} className={"p-5 mt-5"}
            >
                <h2 className={"m-auto"}>Регистрация</h2>
                <Form className={"d-flex flex-column"}>
                    {(usernameDirty && usernameError) && <div style={{color: "red"}}>{usernameError}</div>}
                    <Form.Control
                        onBlur={e => blurHandler(e)}
                        name={'username'}
                        required
                        className={"mt-3"}
                        placeholder={"Введите логин"}
                        value={username}
                        onChange={e => usernameHandler(e)}
                    />
                    {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                    <Form.Control
                        onBlur={e => blurHandler(e)}
                        name={'password'}
                        required
                        className={"mt-3"}
                        placeholder={"Введите пароль"}
                        value={password}
                        onChange={e => passwordHandler(e)}
                        type={"password"}
                    />
                    {(addressDirty && addressError) && <div style={{color: "red"}}>{addressError}</div>}
                    <Form.Control
                        onBlur={e => blurHandler(e)}
                        name={'address'}
                        required
                        className={"mt-3"}
                        placeholder={"Введите адрес"}
                        value={address}
                        onChange={e => addressHandler(e)}
                    />
                    {(phoneDirty && phoneError) && <div style={{color: "red"}}>{phoneError}</div>}
                    <Form.Control
                        onBlur={e => blurHandler(e)}
                        name={'phone'}
                        className={"mt-3"}
                        type="tel"
                        placeholder="+375***********"
                        required
                        value={phone}
                        onChange={e => phoneHandler(e)}
                    />
                    <Row className={"d-flex justify-content-between mt-3 pl-3 pr-3"}>
                        {isLogin ? <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div> : <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>}
                        <Button
                            disabled={!formValid}
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Зарегистрироваться
                        </Button>
                    </Row>
                </Form>
            </Card>}
        </Container>);
});

export default Auth;