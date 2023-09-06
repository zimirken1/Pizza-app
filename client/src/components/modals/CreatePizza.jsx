import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
//import {Context} from "../../index";
import {createPizza} from "../../http/pizzaAPI";
import {observer} from "mobx-react-lite";

const CreatePizza = observer (({show, onHide}) => {
    //const {pizza} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addPizza = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('description', description)
        createPizza(formData).then(data => onHide())
    }

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление пиццы в меню
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название товара"}
                        className={"mt-3"}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        placeholder={"Введите стоимость товара"}
                        className={"mt-3"}
                        type={"number"}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control
                        placeholder={""}
                        className={"mt-3"}
                        type={"file"}
                        onChange={selectFile}
                    />
                    <Form.Control
                        placeholder={"Введите описание товара"}
                        className={"mt-3"}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addPizza}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePizza;