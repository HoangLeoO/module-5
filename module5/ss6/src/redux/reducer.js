import {combineReducers} from "redux";

const initialState = {
    account: null,
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                account: action.payload,
                isAuthenticated: true
            };
        case "LOGIN_FAIL":
            return {
                ...state,
                account: null,
                isAuthenticated: false
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};


export const rootReducer = combineReducers({
    auth: authReducer,
})
