import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer-custom mt-auto">
            <Container>
                <Row className="mb-4">
                    <Col md={4} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3 text-uppercase">Quản lý Furama</h5>
                        <p className="opacity-75 small">
                            Giải pháp toàn diện để quản lý dịch vụ resort, khách hàng và hợp đồng một cách dễ dàng và hiệu quả.
                        </p>
                    </Col>
                    <Col md={4} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3 text-uppercase">Liên kết nhanh</h5>
                        <ul className="list-unstyled small opacity-75">
                            <li>Trang chủ</li>
                            <li>Quản lý dịch vụ</li>
                            <li>Quản lý khách hàng</li>
                            <li>Dịch vụ hợp đồng</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5 className="fw-bold mb-3 text-uppercase">Thông tin liên hệ</h5>
                        <p className="opacity-75 small mb-1">Email: info@furamavietnam.com</p>
                        <p className="opacity-75 small mb-1">Điện thoại: +84 236 3847 333</p>
                    </Col>
                </Row>
                <hr className="bg-light opacity-25" />
                <div className="text-center py-3">
                    <p className="mb-0 small opacity-50">
                        © {new Date().getFullYear()} Furama Resort Danang. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
