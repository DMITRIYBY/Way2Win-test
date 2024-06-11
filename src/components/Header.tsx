import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Navbar, Nav } from 'react-bootstrap';

const Header: React.FC = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#">Way2Win</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/doctors">Врачи</Nav.Link>
                <Nav.Link as={Link} to="/nurses">Медсестры</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Header;
