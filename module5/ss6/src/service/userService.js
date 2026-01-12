import { apiService } from "./apiService.js";

export const checkLogin = async (username, password) => {
    const res = await apiService.get(
        `users?username=${username}&password=${password}`
    );
    return res.data;
};
export const login = async (username, password) => {
    const res = await apiService.get(
        `users?username=${username}&password=${password}`
    );
    return res.data;
};
