import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { Home } from "../pages/Home.jsx";
import AddNewPlayer from "../pages/AddNewPlayer.jsx";
import EditPlayer from "../pages/EditPlayer.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddNewPlayer />} />
                <Route path="/edit/:id" element={<EditPlayer />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
