import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {changeAddress, changePassword, changePhoneNum, fetchUser} from "../http/userAPI";
import {fetchUserOrders} from "../http/orderAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import OrderItem from "../components/OrderItem";

const ProfilePage = observer (() => {
    const {order} = useContext(Context)

    const [user, setUser] = useState({})
    const {id} = useParams()

    const [orders, setOrders] = useState([])

    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const [passwordDirty, setPasswordDirty] = useState(false)
    const [addressDirty, setAddressDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)

    const [passwordError, setPasswordError] = useState('поле не может быть пустым')
    const [addressError, setAddressError] = useState('поле не может быть пустым')
    const [phoneError, setPhoneError] = useState('поле не может быть пустым')

    const [passwordValid, setPasswordValid] = useState(false)
    const [addressValid, setAddressValid] = useState(false)
    const [phoneValid, setPhoneValid] = useState(false)

    useEffect(() => {
        if (passwordError) {
            setPasswordValid(false)
        } else {
            setPasswordValid(true)
        }
        if (addressError) {
            setAddressValid(false)
        } else {
            setAddressValid(true)
        }
        if (phoneError) {
            setPhoneValid(false)
        } else {
            setPhoneValid(true)
        }
    }, [passwordError, addressError, phoneError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'password':
                setPasswordDirty(true)
                break
            case 'address':
                setAddressDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
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

    const changePass = () => {
        new FormData()
        //console.log(password)
        changePassword(password, user._id).then(() => {fetchUser(id).then(data => setUser(data))})
    }
    const changeAddr = () => {
        new FormData()
        changeAddress(address, user._id).then(() => {fetchUser(id).then(data => setUser(data))})
    }
    const changePhone = () => {
        new FormData()
        changePhoneNum(phone, user._id).then(() => {fetchUser(id).then(data => setUser(data))})
    }
    useEffect(() => {
        const fetchData = async () => {
            console.log(localStorage.getItem('token'))
            await fetchUser(id).then(data => setUser(data))
            await fetchUserOrders().then(data => {
                setOrders(data);
            })
        }
        fetchData().then()
    }, [])

    return (
        <Container>
            <h1>Добро пожаловать в личный кабинет, {user && user.username}!</h1>
            <Container className={"mt-3 mb-3"}>
                <Container>
                    <b>Текущий адрес:</b> {user && user.address}
                </Container>
                <Container>
                    <b>Ваш текущий номер телефона:</b> {user && user.phone}
                </Container>
            </Container>
            <Container className={"d-flex flex-fill gap-2"}>
                <Form
                    style={{width: 800}}
                    className={"d-flex gap-2 flex-column"}
                >
                    <Form.Group className={"d-flex gap-3"}>
                        <Form.Control
                            onBlur={e => blurHandler(e)}
                            name={"password"}
                            size={"lg"}
                            placeholder={"Введите новый пароль"}
                            onChange={e => passwordHandler(e)}
                        />
                        {(passwordDirty && passwordError) && <Container style={{color: "red"}}>{passwordError}</Container>}
                    </Form.Group>
                    <Form.Group className={"d-flex gap-3"}>
                        <Form.Control
                            onBlur={e => blurHandler(e)}
                            name={"address"}
                            size={"lg"}
                            placeholder={"Введите новый адрес доставки"}
                            onChange={e => addressHandler(e)}
                        />
                        {(addressDirty && addressError) && <Container style={{color: "red"}}>{addressError}</Container>}
                    </Form.Group>
                    <Form.Group className={"d-flex gap-3"}>
                        <Form.Control
                            onBlur={e => blurHandler(e)}
                            name={"phone"}
                            size={"lg"}
                            placeholder={"Введите новый номер телефона"}
                            onChange={e => phoneHandler(e)}
                        />
                        {(phoneDirty && phoneError) && <Container style={{color: "red"}}>{phoneError}</Container>}
                    </Form.Group>
                </Form>
                <Container style={{width: 600}} className={"d-flex flex-column gap-2"}>
                    <Button
                        size={"lg"}
                        onClick={changePass}
                        disabled={!passwordValid}
                    >
                        Изменить пароль
                    </Button>
                    <Button
                        size={"lg"}
                        onClick={changeAddr}
                        disabled={!addressValid}
                    >
                        Изменить адрес
                    </Button>
                    <Button
                        size={"lg"}
                        onClick={changePhone}
                        disabled={!phoneValid}
                    >
                        Изменить номер телефона
                    </Button>
                </Container>
            </Container>
            <Container className={"mt-3 mb-3"}>
                <h2>Ваши заказы</h2>
                {orders.map((order) => (
                    <OrderItem item={order}/>
                ))}
            </Container>
        </Container>
    );
});

export default ProfilePage;