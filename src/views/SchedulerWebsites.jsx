import React, { useState, useEffect } from "react";
import { Search } from "@material-ui/icons";
import { useAuth } from "../firebase/AuthContext";
import {
    Paper,
    makeStyles,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
} from "@material-ui/core";
import { Table, Input } from "../components";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: "75%",
    },
}));

const headCells = [
    { id: "domain", label: "Domain" },
    { id: "schedulerScanning", label: "Scheduler Scanning" },
    { id: "remove", label: "", disableSorting: true },
];

export default function SchedulerWebsites() {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const { currentUser } = useAuth();
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    useEffect(() => getReport(), []);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = Table(records, headCells, filterFn);

    const handleSearch = (e) => {
        let search = e.target.value;
        setFilterFn({
            fn: (items) => {
                if (search === "") return items;
                else
                    return items.filter((x) =>
                        x.domain.toLowerCase().includes(search)
                    );
            },
        });
    };

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
                const reports = data["data"].filter(
                    (report) => report.scheduleScanning !== "none"
                );
                setRecords(reports);
            })
            .catch(() => {
                console.log("Error: can not send request to server");
            });
    };

    const handleClick = (elementData) => {
        const data = {
            uid: currentUser.uid,
            url: elementData.domain,
        };

        fetch(`http://localhost:5000/api/update-scheduler`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                getReport();
            })
            .catch(() => {
                console.log("Error: can not send request to server");
            });
    };

    return (
        <Paper
            className={classes.pageContent}
            style={{ marginTop: "10%", width: "90%" }}
        >
            <>
                <Toolbar>
                    <Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item) => (
                            <TableRow>
                                <TableCell>{item.domain}</TableCell>
                                <TableCell>{item.scheduleScanning}</TableCell>
                                <TableCell>
                                    <button
                                        type="button"
                                        onClick={() => handleClick(item)}
                                    >
                                        Remove
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </>
        </Paper>
    );
}
