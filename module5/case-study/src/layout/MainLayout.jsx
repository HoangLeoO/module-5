import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Navigation />
            <main className="flex-grow-1 py-5">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
