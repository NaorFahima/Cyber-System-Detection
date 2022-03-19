import React from "react";
import { Card, Button, Table } from "react-bootstrap";

export default function ReportCard({ report, handleClick }) {
  const drawReportDetails = () => {
    var rows = [];
    const keysList = Object.keys(report.details);
    for (var i = 0; i < keysList.length; i += 3) {
      const row = (
        <tr key={i}>
          <td>
            <b>
              {keysList[i].toLowerCase().replaceAll("_", " ").capitalize()}:
            </b>
          </td>
          {report.details[keysList[i]] === 1 ? (
            <td style={{ color: "green" }}>Valid</td>
          ) : report.details[keysList[i]] === 0 ? (
            <td style={{ color: "grey" }}>Suspicious</td>
          ) : (
            <td style={{ color: "red" }}>Invalid</td>
          )}

          <td>
            <b>
              {keysList[i + 1].toLowerCase().replaceAll("_", " ").capitalize()}:
            </b>
          </td>
          {report.details[keysList[i + 1]] === 1 ? (
            <td style={{ color: "green" }}>Valid</td>
          ) : report.details[keysList[i + 1]] === 0 ? (
            <td style={{ color: "grey" }}>Suspicious</td>
          ) : (
            <td style={{ color: "red" }}>Invalid</td>
          )}

          <td>
            <b>
              {keysList[i + 2].toLowerCase().replaceAll("_", " ").capitalize()}:
            </b>
          </td>
          {report.details[keysList[i + 2]] === 1 ? (
            <td style={{ color: "green" }}>Valid</td>
          ) : report.details[keysList[i + 2]] === 0 ? (
            <td style={{ color: "grey" }}>Suspicious</td>
          ) : (
            <td style={{ color: "red" }}>Invalid</td>
          )}
        </tr>
      );
      rows.push(row);
    }
    return <tbody>{rows}</tbody>;
  };
  return (
    <>
      <Button variant="link" onClick={handleClick}>
        Go back
      </Button>
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <h5>
            <b>Url: </b>
            <a href={report.url} target="_blank" rel="noopener noreferrer">
              {report.url}
            </a>
          </h5>
          <h5>
            <b>IP: {report.ip}</b>
          </h5>
          <h5>
            <b>Location: {report.location}</b>
          </h5>
        </Card.Header>
        <Card.Body>
          <h5>
            <b>Report Details:</b>
          </h5>
          <Table striped bordered className="text-center">
            {drawReportDetails()}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});
