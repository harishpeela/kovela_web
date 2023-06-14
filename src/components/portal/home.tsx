import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './side-nav';
import { Outlet } from 'react-router-dom';

const Home = () => {
	return (
		<React.Fragment>
			<Container className='py-5'>
            Test Home
			</Container>
		</React.Fragment>
	)
}

export default Home;