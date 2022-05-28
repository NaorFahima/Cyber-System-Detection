import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/AuthContext";
import { Paper, makeStyles } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { ReportsCard, ReportCard } from "../components";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

const firstStateHeadCells = [
    { id: "domain", label: "Domain" },
    { id: "timestamp", label: "Timestamp" },
];
const secondStateHeadCells = [
    { id: "domain", label: "Domain" },
    { id: "score", label: "Score" },
];

export default function Reports() {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [report, setReport] = useState([]);
    const [data, setData] = useState({});
    const { currentUser } = useAuth();
    const [tableState, setTableState] = useState(0);
    const [headCells, setHeadCells] = useState(firstStateHeadCells);

    const getReport = () => {
        fetch(`http://localhost:5000/api/reports/${currentUser.uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data["data"].sort((a, b) => {
                    var dateA = new Date(a.timestamp),
                        dateB = new Date(b.timestamp);
                    return dateA - dateB;
                });
                setRecords(data["data"]);
                setData(data["data"]);
            })
            .catch(() => {
                console.log("Error: can not send request to server");
            });
    };

    useEffect(() => getReport(), []);

    const updateTable = (state, headCellsName, data) => {
        setTableState(state);
        setHeadCells(headCellsName);
        setRecords(data);
    };

    const handleClick = (elementData) => {
        if (tableState === 0)
            updateTable(1, secondStateHeadCells, elementData.urls);
        else if (tableState === 1) {
            setTableState(2);
            setReport(elementData);
        }
    };

    return (
        <Paper
            className={classes.pageContent}
            style={{ marginTop: "10%", width: "90%" }}
        >
            {tableState === 0 && (
                <ReportsCard
                    key={0}
                    records={records}
                    headCells={headCells}
                    handleClick={handleClick}
                />
            )}

            {tableState === 1 && (
                <>
                    <Button
                        variant="link"
                        onClick={() =>
                            updateTable(0, firstStateHeadCells, data)
                        }
                    >
                        Go back
                    </Button>
                    <ReportsCard
                        key={1}
                        records={records}
                        headCells={headCells}
                        handleClick={handleClick}
                    />
                </>
            )}

            {tableState === 2 && (
                <ReportCard
                    key={2}
                    report={report}
                    handleClick={() => setTableState(1)}
                />
            )}
        </Paper>
    );
}
