import React, { useEffect } from 'react';
import loginImg from '../../../images/login-signup.avif';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Login() {
    return (
        <Container>
            <Row>
                <Col>1 of 2</Col>
                <Col>
                    <Image src={loginImg} fluid />
                </Col>
            </Row>
        </Container>
    )
}

export default Login