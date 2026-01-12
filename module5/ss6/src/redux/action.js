import {login} from "../service/userService.js";


export const checkLogin = (userInfo) => {
    return async (dispatch) => {
        const loginUser = await login(
            userInfo.username,
            userInfo.password
        );

        if (loginUser.length === 1) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: loginUser[0]
            });
            return true;
        } else {
            dispatch({
                type: "LOGIN_FAIL"
            });
            return false;
        }
    };
};

export const logout = () => {
    return (dispatch) => {

        dispatch({
            type: "LOGOUT",
            payload: null
        })
    }

}
