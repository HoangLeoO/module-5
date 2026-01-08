import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header/>

            <main className="container mt-4">
                <Outlet/>
            </main>

            <Footer/>
        </>
    );
};

export default MainLayout;
