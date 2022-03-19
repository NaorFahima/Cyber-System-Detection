import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../firebase/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetch(`/api/user/${currentUser.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUserDetails(data))
      .catch(() => {
        console.log("Error: can not send user information to the server");
      });
  }, [currentUser.uid]);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match");

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email)
      promises.push(updateEmail(emailRef.current.value));

    if (passwordRef.current.value)
      promises.push(updatePassword(passwordRef.current.value));

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      uid: currentUser.uid,
    };

    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch(() => {
      console.log("Error: can not send user information to the server");
    });
  }

  return (
    <>
      <Card
        style={{
          marginLeft: "25%",
          marginTop: "8%",
          width: "50%",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                ref={firstNameRef}
                required
                defaultValue={userDetails.firstName}
              />
            </Form.Group>
            <Form.Group id="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                ref={lastNameRef}
                required
                defaultValue={userDetails.lastName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
        <Link className="text-center mt-1" to="/">
          Cancel
        </Link>
      </Card>
    </>
  );
}
