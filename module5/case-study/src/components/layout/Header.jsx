import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
    return (
        <header className="bg-premium-gradient py-3 text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <div className="d-flex align-items-center">
                            <img
                                src="https://furamavietnam.com/wp-content/uploads/2018/08/logo.png"
                                alt="Furama Logo"
                                height="60"
                                className="me-3 bg-white p-1 rounded"
                            />
                            <div>
                                <h1 className="h3 mb-0 fw-bold">FURAMA RESORT</h1>
                                <p className="mb-0 small opacity-75">Hệ thống quản lý</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="text-end d-none d-md-block">
                        <div className="small">
                            <p className="mb-0 fw-light">103 – 105 Đường Võ Nguyên Giáp, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Thành phố Đà Nẵng, Việt Nam</p>
                            <p className="mb-0 fw-light">Điện thoại: 84-236-3847 333/888 * Fax: 84-236-3848 511</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
