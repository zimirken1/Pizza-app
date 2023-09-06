import React, {useContext} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {Context} from "../index";
import {finishOrder} from "../http/orderAPI";
import {fetchOrders} from "../http/orderAPI";
const moment = require('moment');


const OrderItem = ({item, setOrders}) => {
    console.log(item);
    const finish = () => {
        finishOrder(item._id).then(() => {
            fetchOrders().then(data => setOrders(data))
        })
    }
    const {user} = useContext(Context)
    return (
        <Container className={"d-inline"}>
            <Card className={"d-flex flex-row gap-3"}>
                <Container>
                    {item.createdBy.username}, {item.createdBy.phone}
                </Container>
                <Container>
                    {/*{item._id}*/}
                    {item.createdBy.address}
                </Container>
                <Container>
                    {moment(new Date(item.createdAt)).format('DD.MM.YYYY, HH:mm:ss')}
                </Container>
                <Container>
                    {item.items.map((pizza) => {
                        return <div>{pizza.name + " " + pizza.price + "BYN"}</div>
                    })}
                </Container>
                <Container
                    //style={{color: "orange"}}
                >
                    {item.status === "Принят"?
                        <div style={{color: "orange"}}>Принят</div>
                        :
                        <div style={{color: "green"}}>Завершён</div>
                    }
                </Container>
                {user.isAdmin &&
                    <Button
                        size={"lg"}
                        variant={"success"}
                        className={"m-auto"}
                        onClick={finish}
                    >
                        Завершить
                    </Button>
                }
            </Card>
        </Container>
    );
};

export default OrderItem;