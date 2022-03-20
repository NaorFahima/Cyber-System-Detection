import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../firebase/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetch(`https://cyber-system-detection-api.herokuapp.com/api/user/${currentUser.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((user) => setUserDetails(user))
      .catch(() =>
        setError("Error: can not send user information to the server")
      );
  }, [currentUser.uid]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/#/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      {currentUser && (
        <Card
          style={{
            marginLeft: "35%",
            marginTop: "15%",
            textAlign: "center",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Name:</strong>
            {` ${userDetails.firstName} ${userDetails.lastName}`}
            <br />
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </Card>
      )}
    </>
  );
}
