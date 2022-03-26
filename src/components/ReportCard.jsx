import React from "react";
import { Card, Button, Table } from "react-bootstrap";
import { OverlayToolTip } from './'

const toolTipMessages = {
  ABNORMAL: 'Identity of the website owner is typically part of its URL',
  AGE_OF_DOMAIN: 'The age of the domain is more then 6 months',
  AT_SYMBOL: '@ symbol not in URL',
  DISABLE_RIGHT_CLICK: 'Right-click on mouse in website is not disabled',
  DNS_RECORD: 'Website has DNS record for the domain',
  DOMAIN_REGISTRATION_LENGTH: 'Domain expires in more then a year',
  DOUBLE_SLASH_REDIRECTING: 'The website URL redirect to other websites',
  FAVICON_CURRUNT_DOMAIN: 'Favicon loaded from the same domain',
  GOOGLE_INDEX: 'Webpage Indexed by Google',
  HTTPS_TOKEN: 'Using HTTPS token in domain part of the URL',
  HYPHEN_SYMBOL: 'Domain name part doesnt includes (-) symbol',
  IFRAME_REDIRECTION: 'Website not using iframe',
  IP_ADDRESS: 'The domain doesnt has an IP address',
  LEGITIMATE_A_TAGS: 'Website doesnt has many URL anchors',
  LEGITIMATE_LINKS_POINTING: 'Website has links pointing to the webpage',
  LEGITIMATE_LINKS_TAGS: 'Website doesnt has many link tags',
  LEGITIMATE_WEBSITE_FORWARDING: 'Website doesnt has redirect page',
  PAGE_RANK: 'Website has a valid PageRank value',
  POPUP_WINDOWS: 'Popoup window doesnt contains text fields',
  SHORTING_SERVICE: 'Doesnt use URL shortner service',
  SSL: 'Use HTTPS and issuer is trusted and age of certificate is more then 1 year',
  STATISTICAL_REPORT: 'Host doesnt belongs to top phishing IPs or top phishing domains',
  STATUS_BAR_ON_MOUSE_OVER: 'onMouseOver doesnt changes status bar',
  SUBMITING_TO_EMAIL: 'Web form allows a user to submit his personal information that is directed to a server for processing',
  SUB_DOMAIN: 'The url have sub domain',
  TRUSTY_PORT: 'Using trusty port HTTPS/HTTP',
  VALID_LENGTH: 'URL length is less then 54 characters',
  VALID_REQUEST: 'The external objects contained within a webpage such as images, videos and sounds are loaded from another domain',
  VALID_SFH: 'SFHs that contain an empty string or “about:blank” are considered doubtful because an action should be taken upon the submitted information',
  WEB_TRAFFIC: 'Measures the popularity of the website by determining the number of visitors and the number of pages they visit',
}

export default function ReportCard({ report, handleClick }) {
  const drawReportDetails = () => {
    var rows = [];
    const keysList = Object.keys(report.details);
    for (var i = 0; i < keysList.length; i += 3) {
      const row = (
        <tr key={i}>
        <OverlayToolTip 
          toolTipMessage={toolTipMessages[keysList[i]]} 
          text={keysList[i].toLowerCase().replaceAll("_", " ").capitalize()}/>
          {report.details[keysList[i]] === 1 ? (
            <td style={{ color: "green" }}>Valid</td>
          ) : report.details[keysList[i]] === 0 ? (
            <td style={{ color: "grey" }}>Suspicious</td>
          ) : (
            <td style={{ color: "red" }}>Invalid</td>
          )}

          <OverlayToolTip 
            toolTipMessage={toolTipMessages[keysList[i + 1]]} 
            text={keysList[i + 1].toLowerCase().replaceAll("_", " ").capitalize()}/>
          {report.details[keysList[i + 1]] === 1 ? (
            <td style={{ color: "green" }}>Valid</td>
          ) : report.details[keysList[i + 1]] === 0 ? (
            <td style={{ color: "grey" }}>Suspicious</td>
          ) : (
            <td style={{ color: "red" }}>Invalid</td>
          )}
          <OverlayToolTip 
            toolTipMessage={toolTipMessages[keysList[i + 2]]} 
            text={keysList[i + 2].toLowerCase().replaceAll("_", " ").capitalize()}/>
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
