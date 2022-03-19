import React, { useRef, useState } from "react";
import { useAuth } from "../firebase/AuthContext";
import { Form, Button, Card, Spinner, Container } from "react-bootstrap";

export default function UrlDetection() {
  const urlRef = useRef();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const data = {
      url: urlRef.current.value,
      uid: currentUser ? currentUser.uid : null,
    };
    console.log(data);
    fetch("/api/url-detection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResult(data["message"]);
        setLoading(false);
      })
      .catch(() => {
        setResult("Error: can not send request to server");
        setLoading(false);
      });
  }

  return (
    <Card style={{ marginTop: "15%", width: "90%", marginLeft: "8%" }}>
      <Card.Header>
        <h2 className="text-center">Url Detection</h2>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="url">
            <Form.Control
              placeholder="Enter URL"
              ref={urlRef}
              required
              type="url"
            />
          </Form.Group>

          <Button disabled={loading} className="w-100" type="submit">
            {!loading && <span>Check URL</span>}
            {loading && <Spinner animation="border" />}
          </Button>
        </Form>
        <center>
          <br />
          <br />
          <h2>{result}</h2>
        </center>
      </Card.Body>
    </Card>
  );
}
