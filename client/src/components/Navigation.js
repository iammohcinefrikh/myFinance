import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import navbarLogo from "../assets/navbar-logo.svg";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img src={navbarLogo} className="d-inline-block align-top" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth.isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard" style={location.pathname === "/dashboard" ? { fontWeight: 600, color: "black" } : {}}>Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/expenses" style={location.pathname === "/expenses" || /^\/expenses\/.*$/.test(location.pathname) ? { fontWeight: 600, color: "black" } : {}}>Dépenses</Nav.Link>
                <Nav.Link as={Link} to="/profile" style={location.pathname === "/profile" ? { fontWeight: 600, color: "black" } : {}}>Profile</Nav.Link>
                <Nav.Link as={Link} onClick={logout}>Se déconnecter</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" style={location.pathname === "/" ? { fontWeight: 600, color: "black" } : {}}>Accueil</Nav.Link>
                <Nav.Link as={Link} to="/login">Se connecter</Nav.Link>
                <Nav.Link as={Link} to="/register">S'enregistrer</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;