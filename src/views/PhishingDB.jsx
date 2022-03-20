import React, { useState, useEffect } from "react";
import { ReportsCard, ReportCard } from "../components";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: "domain", label: "Domain" },
  { id: "timestamp", label: "Timestamp" },
];

export default function PhishingDB() {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [isShowingReport, setIsShowingReport] = useState(false);
  const [report, setReport] = useState({});

  useEffect(() => getReport(), []);

  const getReport = () => {
    fetch("https://cyber-system-detection-api.herokuapp.com/api/phishing-db", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((reports) => {
        reports["data"].sort((a, b) => {
          var dateA = new Date(a.timestamp),
            dateB = new Date(b.timestamp);
          return dateA - dateB;
        });
        setRecords(reports["data"]);
      })
      .catch(() => {
        console.log("Error: can not send request to server");
      });
  };

  const handleClick = (elementData) => {
    setIsShowingReport(true);
    setReport(elementData);
  };

  return (
    <Paper
      className={classes.pageContent}
      style={{ marginTop: "10%", width: "90%" }}
    >
      {!isShowingReport && (
        <ReportsCard
          records={records}
          headCells={headCells}
          handleClick={handleClick}
        />
      )}
      {isShowingReport && (
        <ReportCard
          report={report}
          handleClick={() => setIsShowingReport(false)}
        />
      )}
    </Paper>
  );
}
