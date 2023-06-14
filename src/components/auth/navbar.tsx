import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AuthNavbar = () => {
    return (
        <React.Fragment>
            <Navbar bg="primary" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand>kovela-admin</Navbar.Brand>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}
export default AuthNavbar;