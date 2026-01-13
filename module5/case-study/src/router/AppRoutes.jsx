import React from 'react';
import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import MainLayout from '../layout/MainLayout';
import { ListFacility } from "../pages/facility/ListFacility.jsx";
import { ListEmployee } from "../pages/employee/ListEmployee.jsx";
import CreateEmployee from "../pages/employee/CreateEmployee.jsx";
import { ListCustomer } from "../pages/customer/ListCustomer.jsx";
import { ListContract } from "../pages/contract/ListContract.jsx";
import CreateFacility from "../pages/facility/CreateFacility.jsx";
import EditFacility from "../pages/facility/EditFacility.jsx";
import CreateCustomer from "../pages/customer/CreateCustomer.jsx";
import EditCustomer from "../pages/customer/EditCustomer.jsx";
import CreateContract from "../pages/contract/CreateContract.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/facility" element={<ListFacility />} />
                <Route path="/facility/create" element={<CreateFacility />} />
                <Route path="/facility/edit/:id" element={<EditFacility />} />
                <Route path="/employee" element={<ListEmployee />} />
                <Route path="/employee/create" element={<CreateEmployee />} />
                <Route path="/customer" element={<ListCustomer />} />
                <Route path="/customer/create" element={<CreateCustomer />} />
                <Route path="/customer/edit/:id" element={<EditCustomer />} />
                <Route path="/contract" element={<ListContract />} />
                <Route path="/contract/create" element={<CreateContract />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
