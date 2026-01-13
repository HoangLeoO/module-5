import api from "./api";

export const getAllCustomers = async () => {
    try {
        const res = await api.get("/customers?_expand=customerType");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch customers:", error);
        throw error;
    }
};

export const getCustomerById = async (id) => {
    try {
        const res = await api.get(`/customers/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to fetch customer ${id}:`, error);
        throw error;
    }
};

export const createCustomer = async (customer) => {
    try {
        const res = await api.post("/customers", customer);
        return res.data;
    } catch (error) {
        console.error("Failed to create customer:", error);
        throw error;
    }
};

export const updateCustomer = async (id, customer) => {
    try {
        const res = await api.put(`/customers/${id}`, customer);
        return res.data;
    } catch (error) {
        console.error(`Failed to update customer ${id}:`, error);
        throw error;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const res = await api.delete(`/customers/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to delete customer ${id}:`, error);
        throw error;
    }
};
export const getAllCustomerTypes = async () => {
    try {
        const res = await api.get("/customerTypes");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch customer types:", error);
        throw error;
    }
};
