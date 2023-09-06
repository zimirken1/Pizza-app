import React from 'react'
import {Button, Card, Container, Image} from "react-bootstrap";

const BasketItem = ({item, onRemove}) => {

    return (
        <Container>
            <Card className={"d-flex flex-row align-items-center gap-2 p-1 mt-1"}>
                <Image
                    width={100}
                    height={100}
                    src={process.env.REACT_APP_API_URL + item.img}
                    style={{cursor: 'pointer'}}
                />
                <Container className={"d-flex flex-column"}>
                    <div><strong>{item.name}</strong></div>
                    <div>{item.price} BYN</div>
                </Container>
                <Button variant={"danger"} onClick={() => onRemove(item)}>x</Button>
            </Card>
        </Container>
    )
}

export default BasketItem
