import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getAllEmployees = async () => {
    try {
        const res = await api.get("/employees");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch employees:", error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const res = await api.get(`/employees/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to fetch employee ${id}:`, error);
        throw error;
    }
};

export const createEmployee = async (employee) => {
    try {
        const res = await api.post("/employees", employee);
        return res.data;
    } catch (error) {
        console.error("Failed to create employee:", error);
        throw error;
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const res = await api.put(`/employees/${id}`, employee);
        return res.data;
    } catch (error) {
        console.error(`Failed to update employee ${id}:`, error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const res = await api.delete(`/employees/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to delete employee ${id}:`, error);
        throw error;
    }
};

export const getPositions = async () => {
    try {
        const res = await api.get("/master-data/positions");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch positions:", error);
        throw error;
    }
};

export const getEducationDegrees = async () => {
    try {
        const res = await api.get("/master-data/education-degrees");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch education degrees:", error);
        throw error;
    }
};

export const getDivisions = async () => {
    try {
        const res = await api.get("/master-data/divisions");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch divisions:", error);
        throw error;
    }
};
