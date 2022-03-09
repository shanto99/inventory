import { LOGIN, GET_USER, LOGOUT } from "../constants/action-types";
const initialState = {
    user: null
};

function rootReducer(state=initialState, action) {
    if(action.type === LOGIN || action.type === GET_USER) {
        return Object.assign({}, state, {
            user: action.payload
        });
    } else if(action.type === LOGOUT) {
        return Object.assign({}, state, {
            user: null
        });
    }

    return state;
}

export default rootReducer;
