import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card, Container, Button, Modal, Form } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CreateColumnModal() {
    let { id } = useParams();

    const columnNameRef = useRef();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_BACKEND + '/column/create/' + id, {
            name: columnNameRef.current.value
        }).then((_) => {
            setShow(false);
        }).catch((err) => console.log(err));
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Column
        </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Column</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="columnName">
                            <Form.Control type="text" placeholder="Column Name" ref={columnNameRef} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Create
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );

}

export default function BoardPage() {

    let { id } = useParams();

    const [board, setBoard] = useState({
        name: '',
        columns: []
    });

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND + '/board/' + id)
            .then(res => {
                setBoard({ name: res.data.name, columns: res.data.columns })
            })
    })

    const columnsList = board.columns.map((column, index) => {
        return (<>
        <Card style={{ "width": "20rem" }}>
            {column.name}
        </Card>  </>);
    })

return (
    <div>
        <h1>{board.name}</h1>
        <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
        <Container style={{ "margin": "0", "overflow-x": "scroll" }}>
            { columnsList }
            <CreateColumnModal />
        </Container>
    </div>);
}