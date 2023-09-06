import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreatePizza from "../components/modals/CreatePizza";
import DeletePizza from "../components/modals/DeletePizza";
import {fetchOrders} from "../http/orderAPI";
import OrderItem from "../components/OrderItem";
//import {createPizza} from "../http/pizzaAPI";

const Admin = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetchOrders().then(data => setOrders(data))
    }, [])
    const [pizzaVisible, setPizzaVisible] = useState(false)
    const [delPizzaVisible, setDelPizzaVisible] = useState(false)

    return (
        <Container className={"d-flex flex-column"}>
            <Button
                size={"lg"}
                className={"mt-2"}
                onClick={() => setPizzaVisible(true)}
            >
                Добавить пиццу в меню
            </Button>
            <Button
                size={"lg"}
                className={"mt-2"}
                onClick={() => setDelPizzaVisible(true)}
            >
                Удалить пиццу
            </Button>
            <CreatePizza show = {pizzaVisible} onHide={() => setPizzaVisible(false)}/>
            <DeletePizza show = {delPizzaVisible} onHide={() => setDelPizzaVisible(false)}/>
            <Container>
                <h2>Все заказы:</h2>
                <Container>
                    {orders.map((order) => (
                        <OrderItem item={order} setOrders={setOrders}/>
                    ))}
                </Container>
            </Container>
        </Container>
    );
};

export default Admin;