import { Outlet, Route, MemoryRouter as Router, Routes, useNavigate } from 'react-router-dom';
import PortalNavbar from './components/portal/header';
import React, { useState, useEffect } from 'react';
import PortalFooter from './components/portal/footer';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './components/portal/side-nav';
import axios from 'axios';
import AlertModal from './components/portal/modals/alert-modal';
import { AlertType } from './components/portal/types/alert.type';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertData, setShowAlertData] = useState({message: 'Session Timeout.', showModal: false} as AlertType);
  const navigate = useNavigate();

    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

  axios.interceptors.response.use(
      (res) => {
         // Add configurations here
         if (res.status === 401) {
          setShowAlertData({...alertData, showModal: true});
          localStorage.clear();
         }
         return res;
      },
      (err) => {
         return Promise.reject(err);
      }
   );
	
	return (
		<React.Fragment>
      { alertData.showModal && (<AlertModal message={alertData.message} onHandleValue={function (value: boolean): void {
              navigate('/auth/login');
          } }  /> )
        }
			{isLoggedIn && <PortalNavbar />}
      <Container>
      
      <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                    <Sidebar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                    <Outlet />
                    </Col> 
                </Row>
                </Container>
               
			{isLoggedIn && <PortalFooter />}
		</React.Fragment>
	);
}

export default App;
