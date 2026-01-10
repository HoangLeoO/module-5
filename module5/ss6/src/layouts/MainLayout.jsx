import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <Container className="mt-4">
                <main>
                    <Outlet />
                </main>
            </Container>
        </div>
    );
};

export default MainLayout;
