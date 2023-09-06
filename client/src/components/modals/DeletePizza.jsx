import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Modal} from "react-bootstrap";
import {deletePizza} from "../../http/pizzaAPI";


const DeletePizza = observer (({show, onHide}) => {
    const [name, setName] = useState('')
    const delPizza = () => {
        new FormData()
        console.log(name)
        deletePizza(name).then(data => onHide())
    }
    return (
        <Modal
            show = {show}
            onHide = {onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление пиццы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название товара, который хотите удалить"}
                        className={"mt-3"}
                        onChange={e => setName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Отмена</Button>
                <Button variant={"outline-success"} onClick={delPizza}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeletePizza;