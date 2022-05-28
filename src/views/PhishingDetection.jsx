import React, { useRef, useState } from "react";
import { useAuth } from "../firebase/AuthContext";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    FormLabel,
    FormGroup,
    Radio,
    RadioGroup,
} from "@material-ui/core";

export default function PhishingDetection() {
    const urlRef = useRef();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [scores, setScores] = useState(Array(5).fill(true));
    const [scheduleScanning, setScheduleScanning] = useState("none");
    const scoreRange = [1, 2, 3, 4, 5];
    const scheduleScanningRange = ["None", "Weekly", "Monthly"];

    const handleScoreChange = (e) => {
        let array = scores;
        array[e.target.value - 1] = e.target.checked;
        setScores(array);
    };

    const postPhishingDetection = (data) => {
        fetch("http://localhost:5000/api/phishing-detection", {
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
                data["result"].length !== 0
                    ? setResult(
                          "Finish! you can see the report in your profile reports"
                      )
                    : setResult("This url does not have phishing websites");
                setLoading(false);
            })
            .catch(() => {
                setResult("Error: can not send request to server");
                setLoading(false);
            });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResult(
            "This operation can take a few minutes and will generate a report"
        );
        const data = {
            url: urlRef.current.value,
            uid: currentUser ? currentUser.uid : null,
            scores: scores,
            scheduleScanning: scheduleScanning,
        };
        postPhishingDetection(data);
    }

    return (
        <Card
            style={{
                marginTop: "15%",
                width: "90%",
                marginLeft: "8%",
                textAlign: "center",
            }}
        >
            <Card.Header>
                <h2 className="text-center"> Phishing Detection </h2>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <FormControl
                        component="fieldset"
                        style={{ float: "left", marginLeft: "10%" }}
                    >
                        <FormLabel>
                            <b>Find by Score</b>
                        </FormLabel>
                        <FormGroup aria-label="position" row>
                            {scoreRange.map((index) => {
                                return (
                                    <FormControlLabel
                                        value={index}
                                        control={
                                            <Checkbox
                                                onChange={handleScoreChange}
                                                defaultChecked
                                            />
                                        }
                                        label={index}
                                        labelPlacement="top"
                                    />
                                );
                            })}
                        </FormGroup>
                    </FormControl>
                    <FormControl style={{ float: "right", marginRight: "10%" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            <b>Schedule Scanning</b>
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={scheduleScanning}
                            onChange={(event) =>
                                setScheduleScanning(event.target.value)
                            }
                        >
                            {scheduleScanningRange.map((value) => {
                                return (
                                    <FormControlLabel
                                        value={value.toLowerCase()}
                                        control={<Radio />}
                                        label={value}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                    <Form.Group id="url">
                        <Form.Control
                            placeholder="Enter URL"
                            ref={urlRef}
                            required
                            type="url"
                        />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                        {!loading && <span> Check URL </span>}
                        {loading && <Spinner animation="border" />}
                    </Button>
                </Form>
            </Card.Body>
            <center>
                <h2> {result} </h2>
            </center>
        </Card>
    );
}
