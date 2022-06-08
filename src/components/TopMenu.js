import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function TopMenu() {
    const { token } = useSelector((state) => state.authentication);

    return (
        <div className="sticky-top">
            <Navbar bg="dark" variant='dark' expand="md">
                <div className="container-fluid">
                    <Navbar.Brand className='mb-0 h1'>MyForums</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navmenu">
                        <Nav className="px-md-5">
                            <Nav.Link href="#aboutus">About us</Nav.Link>
                            <Nav.Link href="#socials">Socials</Nav.Link>
                            <Nav.Link href="#faq">FAQ</Nav.Link>
                        </Nav>
                        <div className="ms-auto">
                            {token ? <LogoutButton /> : <LoginButton />}
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    )
}

export default TopMenu