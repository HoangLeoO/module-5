import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <div className="text-center mb-5">
                <h2 className="fw-bold text-gradient display-5">Welcome to Furama Resort</h2>
                <p className="lead text-muted">Elevating your resort management experience</p>
            </div>

            <Row className="g-4">
                {[
                    { title: 'Facilities', count: '12', icon: 'bi-house', desc: 'Manage villas, houses and rooms' },
                    { title: 'Customers', count: '450', icon: 'bi-people', desc: 'Track guest information' },
                    { title: 'Contracts', count: '89', icon: 'bi-file-earmark-text', desc: 'Manage bookings and agreements' }
                ].map((item, idx) => (
                    <Col md={4} key={idx}>
                        <Card className="card-hover text-center p-4">
                            <Card.Body>
                                <div className="display-4 text-primary mb-3">
                                    {item.count}
                                </div>
                                <h4 className="fw-bold">{item.title}</h4>
                                <p className="text-muted small">{item.desc}</p>
                                <Button variant="outline-primary" className="rounded-pill px-4">View All</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
