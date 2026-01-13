import api from "./api";

export const getAllFacilities = async () => {
    try {
        const res = await api.get("/facilities?_expand=facilityType");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch facilities:", error);
        throw error;
    }
};

export const getFacilityById = async (id) => {
    try {
        const res = await api.get(`/facilities/${id}?_expand=facilityType`);
        return res.data;
    } catch (error) {
        console.error(`Failed to fetch facility ${id}:`, error);
        throw error;
    }
};

export const createFacility = async (facility) => {
    try {
        const res = await api.post("/facilities", facility);
        return res.data;
    } catch (error) {
        console.error("Failed to create facility:", error);
        throw error;
    }
};

export const updateFacility = async (id, facility) => {
    try {
        const res = await api.put(`/facilities/${id}`, facility);
        return res.data;
    } catch (error) {
        console.error(`Failed to update facility ${id}:`, error);
        throw error;
    }
};

export const deleteFacility = async (id) => {
    try {
        const res = await api.delete(`/facilities/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to delete facility ${id}:`, error);
        throw error;
    }
};

export const getFacilityTypes = async () => {
    try {
        const res = await api.get("/facilityTypes");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch facility types:", error);
        throw error;
    }
};

export const getRentTypes = async () => {
    try {
        const res = await api.get("/rentTypes");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch rent types:", error);
        throw error;
    }
};

export const searchFacilities = async (name, facilityTypeId) => {
    try {
        let url = "/facilities?_expand=facilityType&";
        if (name) url += `name_like=${name}&`;
        if (facilityTypeId) url += `facilityTypeId=${facilityTypeId}&`;

        const res = await api.get(url);
        return res.data;
    } catch (error) {
        console.error("Failed to search facilities:", error);
        throw error;
    }
};
