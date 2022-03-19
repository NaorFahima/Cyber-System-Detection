import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../firebase/AuthContext";
import Logo from "../images/app_logo_32.png";

/*
 * Navigation Component.
 * This component use React-Bootstrap Nav component to create NavBar.
 */
export default function Navigation() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={Logo}
            width="32"
            height="32"
            className="d-inline-block align-top"
          />
          &nbsp;&nbsp;Cyber System Detection
        </Navbar.Brand>
        <Nav className="m-auto pe-5">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Detection" id="blocks-nav-dropdown">
            {currentUser && (
              <NavDropdown.Item href="/phishing-detection">
                Phishing Detection
              </NavDropdown.Item>
            )}
            <NavDropdown.Item href="/url-detection">
              URL Detection
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="m-auto pe-5">
          <Nav.Link href="/phishing-db">Phishing DB</Nav.Link>
          {!currentUser && (
            <>
              <Nav.Link href="/login">Log in</Nav.Link>{" "}
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </>
          )}

          {currentUser && (
            <Nav className="m-auto pe-5">
              <NavDropdown title="Profile" id="blocks-nav-dropdown">
                {currentUser && (
                  <NavDropdown.Item href="/profile">
                    View Profile
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item href="/scheduler-websites">
                  Scheduler Websites
                </NavDropdown.Item>
                <NavDropdown.Item href="/reports">Reports</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Nav>
      </Navbar>
  );
}
