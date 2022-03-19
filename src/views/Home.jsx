import React from "react";
import { Card } from "react-bootstrap";
import AppLogo from "../images/app_logo_128.png";


export default function Home() {
  return (
    <Card
      style={{
        marginTop: "10%",
        marginBottom: "5%",
        width: "90%",
        marginLeft: "8%",
      }}
    >
      <Card.Header className='text-center'>
        <h3>Welcome to Cyber System Detection</h3>
      </Card.Header>
      <Card.Body>
        <Card.Title className='text-center'>
          This website is used to detect malicious phishing attempts and phishing websites.
        </Card.Title>
        <Card.Subtitle>
          <br/>
          <h4>Featrures</h4>
        </Card.Subtitle>
        <li>
          <b>URL Detection</b> - Detect if a single URL is a phishing website or not.
        </li>  
        <li>
          <b>Phishing Detection <span style={{color: 'green'}}>{"[Signed users]"}</span> </b>- Detect phishing attacks on a given website. <br/>
          Given a URL our system would generate similar domain names that can imitate the original. <br/>
          The system would generate a report detealing each phishing website it detected and assign it a score value based on similiarity to the original website. <br/>
          &#09;<li style={{listStyleType: 'circle', paddingLeft:'2em'}}>Filter by spesfic scores that will show on final report.</li>
          &#09;<li style={{listStyleType: 'circle' , paddingLeft:'2em'}}>Scheule a timing when the system will auto-monitor and re-generate a new report.</li>
        </li>
        <li>
          <b>Phishing DB </b>- See all malicious website that our system detected. <br/>
        </li>
        <br/>
        <div className="text-center">
         <img src={AppLogo} alt="App Logo" width="128" height="128" />
        </div>
          <span className="text-center">
            <Card.Text inline>
              <h6 style={{ display: "inline" }}>
                {"Designed and built by "}
                <Card.Link
                  className="website-link"
                  href="https://www.birkagal.com"
                  target="_blank"
                >
                  Gal Birka
                </Card.Link>
                {" & "}
                <Card.Link
                  className="website-link m-0"
                  href="https://github.com/NaorFahima"
                  target="_blank"
                >
                  Naor Fahima
                </Card.Link>
                {" | "}
                <Card.Link
                  className="website-link m-0"
                  href="https://github.com/NaorFahima/Phishing-detection"
                  target="_blank"
                >
                  Source
                </Card.Link>
              </h6>
            </Card.Text>
          </span>
      </Card.Body>
    </Card>
  );
}
