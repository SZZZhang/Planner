import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function CreateBoardModal() {
    const boardNameRef = useRef();

    const [show, setShow] = useState(false);
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_BACKEND + '/board/create', {
            userId: currentUser.uid,
            name: boardNameRef.current.value
        }).then((res) => {
            console.log(res);
            setShow(false);
            history.push("/board/" + res.data);
        }).catch((err) => console.log(err));
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Board
        </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Board</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="boardName">
                            <Form.Control type="text" placeholder="Board Name" ref={boardNameRef} />
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

export default function DashboardPage() {

    const [boards, setBoards] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND + '/board/get-all/' + currentUser.uid)
            .then(res => setBoards(res.data))
            .catch(err => console.log(err));
    })


    const boardList = boards.map((board, index) => {
        return (<Card key={index}>
            {board.name}
            <Link to={'/board/' + board._id}>
                <Button>Go</Button>
            </Link>
        </Card>);
    })

    return (
        <Container>
            <h1>Boards</h1>
            {boardList}
            <CreateBoardModal />
        </Container >
    )
}