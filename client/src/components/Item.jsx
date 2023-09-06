import React, {useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {PIZZA_ROUTE} from "../utils/consts";
import {Context} from "../index";

const Item = ({pizza}) => {
    const {basket} = useContext(Context);
    const history = useNavigate()
    return (
        <Col md={3}>
            <Card style={{height: 300, width: 200}} border={"light"} className={"mt-1 mb-1"}>
                <Image
                    width={200}
                    height={200}
                    src={process.env.REACT_APP_API_URL + pizza.img}
                    onClick={() => history(PIZZA_ROUTE + '/' + pizza._id)}
                    style={{cursor: 'pointer'}}
                />
                <Container className={"d-flex justify-content-center align-items-center flex-column"}>
                    <Row>
                        {pizza.name}
                    </Row>
                    <Row>
                        <Col>
                            {pizza.price} BYN
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant={'outline-success'}
                                style={{cursor: 'pointer'}}
                                onClick={() => {basket.addItem(pizza)}}
                            >
                                В корзину
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </Col>
    );
};

export default Item;