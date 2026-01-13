import api from "./api";

export const getAllAttachServices = async () => {
    try {
        const res = await api.get("/attachServices");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch attach services:", error);
        throw error;
    }
};
