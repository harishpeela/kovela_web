import axios from "axios";
import { AnyNsRecord } from "dns";
import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IUser {
	username: string;
	password: string;
}

interface IResponseToken {
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    roles: Array<string>[];
    accessToken: string
    tokenType: string;
}

const Login = () => {

    const loginAPI = 'http://20.255.59.150:9092/api/auth/signin';
    const navigate = useNavigate();
	const [userData, setUserData] = useState({} as IUser);
	const [hasError, setHasError] = useState(false);
	const [errMessage, setErrorMessage] = useState('');

    const submitLoginForm = (event: any) => {
        event.preventDefault();
        axios.post(loginAPI, userData).then((response) => {
			const data = response.data as IResponseToken;
            const token = data.accessToken;
            if (!token) {
                alert('Unable to login. Please try after some time.');
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
            setTimeout(() => {
                navigate('/package-master');
            }, 500);

        }).catch((error) => {
			setUserData({} as IUser);
            setHasError(true);
			setErrorMessage('Please provide valid credentials!');
        });
    }

    return (
        <React.Fragment>
            <Container className="my-5">                
                <Row className="justify-content-center">
				<h2 className="fw-normal mb-5 text-center">Login To <span className="text-danger">kovela-admin</span></h2>
                    <Col md={{span: 6}}>
					{hasError && (<Alert key={'danger'} variant={'danger'} onClose={() => setHasError(false)} dismissible>{errMessage}</Alert>)}
					
                        <Form id="loginForm" onSubmit={submitLoginForm}>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Username</FormLabel>
                                <input type={'text'} className="form-control" id={'username'} 
								onChange={(event: any)=> {
									(userData as any)[event.target.name] = event.target.value;
									setUserData(userData);
								}}
								value={userData.username} name="username" required />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                                <input type={'password'} className="form-control" id={'password'} 
								onChange={(event: any)=> {
									(userData as any)[event.target.name] = event.target.value;
									setUserData(userData);
								}} name="password" value={userData.password} required />
                            </FormGroup>
                            <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default Login;