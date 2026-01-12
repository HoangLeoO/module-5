import {apiService} from "./apiService.js";

export const getAll = async () => {
    const res = await apiService.get("/players");
    return res.data;
};

export const findByIdPlayer = async (id) => {
    const res = await apiService.get(`/players/${id}`);
    return res.data;
};

export const addPlayer = async (player) => {
    const res = await apiService.post("/players", player);
    return res.data;
};

export const editPlayer = async (id, player) => {
    const res = await apiService.put(`/players/${id}`, player);
    return res.data;
};

export const deletePlayer = async (id) => {
    await apiService.delete(`/players/${id}`);
};
