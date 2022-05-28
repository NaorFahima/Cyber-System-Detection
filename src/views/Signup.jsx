import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../firebase/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value
            ).then((response) => {
                console.log(response.user.uid);
                const data = {
                    uid: response.user.uid,
                    email: emailRef.current.value,
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                };
                fetch("http://localhost:5000/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).catch(() => {
                    console.log(
                        "Error: can not send user information to the server"
                    );
                });
            });
            history.push("/#/");
        } catch (error) {
            setError(error["message"]);
        }
        setLoading(false);
    }

    return (
        <Card
            style={{
                marginLeft: "25%",
                marginTop: "10%",
                width: "50%",
            }}
        >
            <Card.Body>
                <h2 className="text-center">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" ref={firstNameRef} required />
                    </Form.Group>
                    <Form.Group id="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" ref={lastNameRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            required
                        />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            ref={passwordConfirmRef}
                            required
                        />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                        Sign Up
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Card.Body>
        </Card>
    );
}
