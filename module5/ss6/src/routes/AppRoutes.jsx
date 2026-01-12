import {Routes, Route} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import {Home} from "../pages/Home.jsx";
import AddNewPlayer from "../pages/AddNewPlayer.jsx";
import EditPlayer from "../pages/EditPlayer.jsx";
import Login from "../pages/Login.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/add" element={<AddNewPlayer/>}/>
                <Route path="/edit/:id" element={<EditPlayer/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
