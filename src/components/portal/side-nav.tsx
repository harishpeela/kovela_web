import React, { useState } from "react";
import {Nav} from "react-bootstrap";
import "./side-nav.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState('/profile-master');
    return (
        <>
    
            <Nav variant="pills" className="col-md-12 d-md-block bg-light sidebar"
            defaultActiveKey={activeKey}
            onSelect={selectedKey => { 
                if(selectedKey) {
                setActiveKey(selectedKey);
                navigate(selectedKey);
                }
         }}
            >
                <div className="sidebar-sticky"></div>
            
            <Nav.Item>
                <Nav.Link eventKey="/profile-master">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/designation-master">Designation</Nav.Link>
            </Nav.Item>
            </Nav>
          
        </>
        );
  };

  export default Sidebar