import api from "./api";

export const getAllEmployees = async () => {
    try {
        const res = await api.get("/employees?_expand=position&_expand=educationDegree&_expand=division");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch employees:", error);
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
