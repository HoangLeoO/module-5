import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

const Navigation = () => {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="navbar-custom sticky-top" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`px-3 fw-medium ${location.pathname === '/' ? 'text-primary' : ''}`}
                        >
                            Trang chủ
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/facility"
                            className={`px-3 fw-medium ${location.pathname.startsWith('/facility') ? 'text-primary' : ''}`}
                        >
                            Dịch vụ
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/employee"
                            className={`px-3 fw-medium ${location.pathname.startsWith('/employee') ? 'text-primary' : ''}`}
                        >
                            Nhân viên
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/customer"
                            className={`px-3 fw-medium ${location.pathname.startsWith('/customer') ? 'text-primary' : ''}`}
                        >
                            Khách hàng
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/contract"
                            className={`px-3 fw-medium ${location.pathname.startsWith('/contract') ? 'text-primary' : ''}`}
                        >
                            Hợp đồng
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <span className="navbar-text fw-bold text-dark">
                            Xin chào, Admin
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
