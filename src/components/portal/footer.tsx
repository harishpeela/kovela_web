import React from "react";
import { Container } from "react-bootstrap";

const PortalFooter = () => {
    return (
        <React.Fragment>
            <footer className="bg-light border-top py-3 fixed-bottom">
                <Container>
                    &copy; kovela-admi - 2023
                </Container>
            </footer>
        </React.Fragment>
    );
}

export default PortalFooter;