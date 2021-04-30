import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import React, { useRef, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError('Failed to login');
        }
        setLoading(false);
    }

    return (
        <Container style={{ "margin": "4rem 4rem" }}>
            <Row>
                <h1 style={{ "alignSelf": "center" }}>Login</h1>
            </Row>
            <Row>
                {error && <Alert variant="danger">{error}</Alert>}
            </Row>

            <Form onSubmit={handleSubmit} style={{ "margin": "3rem 3rem" }}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} />
                </Form.Group>             
                <Button type="submit" disabled={loading}>Log in</Button>
                <Row>
                    Need an account? <Link to="/signup">Sign up.</Link>
                </Row>
            </Form>
        </Container>
    );

}



