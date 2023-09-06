import React, {useEffect, useState} from 'react';
import {Card, Container, Image} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOnePizza} from "../http/pizzaAPI";

const PizzaPage = () => {
    const [pizza, setPizza] = useState({})
    const {id} = useParams()

    useEffect(() => {
        fetchOnePizza(id).then(data => setPizza(data))
    })
    return (
        <Container className={"mt-5"}>
            {/*<Row >*/}
            {/*    <Col className={"mt-5"} md={6}>*/}
            {/*        <Image width={500} height={500} src={process.env.REACT_APP_API_URL + pizza.img}/>*/}
            {/*    </Col>*/}
            {/*    <Col md={6}>*/}
            {/*        <Card*/}
            {/*            className={"d-flex align-items-center flex-column justify-content-around"}*/}
            {/*            style={{width: 600, height: 715}}*/}
            {/*        >*/}
            {/*            <h2>{pizza.name}</h2>*/}
            {/*            <h3>{pizza.price}</h3>*/}
            {/*            <p>{pizza.description}</p>*/}
            {/*            <Button variant={"outline-success"}>Добавить в корзину</Button>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Card className={"d-flex flex-row"}>
                <Image
                    className={"mt-4"}
                    width={600} height={500} src={process.env.REACT_APP_API_URL + pizza.img}
                />
                <Container
                    className={"mt-5 d-flex flex-column align-content-between gap-5"}
                >
                    <h1>{pizza.name}</h1>
                    <p>{pizza.description}</p>
                    <h3>{pizza.price} BYN</h3>
                </Container>
            </Card>
        </Container>
    );
};

export default PizzaPage;