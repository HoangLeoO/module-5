import api from "./api";

export const getAllContracts = async () => {
    try {
        const res = await api.get("/contracts?_expand=employee&_expand=customer&_expand=facility");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch contracts:", error);
        throw error;
    }
};

export const createContract = async (contract) => {
    try {
        const res = await api.post("/contracts", contract);
        return res.data;
    } catch (error) {
        console.error("Failed to create contract:", error);
        throw error;
    }
};
