import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-secret-token'
    }
});

export const getAll = async () => {
    const res = await apiClient.get("/players");
    return res.data;
};

export const findByIdPlayer = async (id) => {
    const res = await apiClient.get(`/players/${id}`);
    return res.data;
};

export const addPlayer = async (player) => {
    const res = await apiClient.post("/players", player);
    return res.data;
};

export const editPlayer = async (id, player) => {
    const res = await apiClient.put(`/players/${id}`, player);
    return res.data;
};

export const deletePlayer = async (id) => {
    await apiClient.delete(`/players/${id}`);
};
