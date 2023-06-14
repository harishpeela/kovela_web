import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

const PortalNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/auth/login');
    }

    return (
        <React.Fragment>
            <Navbar bg="primary" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand>kovela-admin | Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link>
                                <Button className="btn-primary" onClick={logout}>Logout</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default PortalNavbar;