import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import React, { useRef, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function SignupPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.pushState("/");
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <Container style={{ "margin": "4rem 4rem" }}>
            <Row>
                <h1 style={{ "alignSelf": "center" }}>Signup</h1>
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
                </Form.Group>                    <Form.Group id="email">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} />
                </Form.Group>
                <Button type="submit" disabled={loading}>Sign up</Button>
                <Row>
                    Already have an account? <Link to="/login">Login.</Link>
                </Row>
            </Form>
        </Container>
    );

}



