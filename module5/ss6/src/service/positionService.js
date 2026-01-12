import {apiService} from "./apiService.js";

export const getAllPosition = async () => {
    const res = await apiService.get('positions');
    return res.data;
}

export const findPositionById = async (id) => {
    const res = await apiService.get(`positions/${id}`)
    return res.data;
}
