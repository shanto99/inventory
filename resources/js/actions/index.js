import axios from "axios";
import { LOGIN, GET_USER, LOGOUT } from "../constants/action-types";
import folderName from "../folderName";

export function login(userId, password) {
    return function(dispatch) {
        axios.post(`/${folderName}/login`, {
            UserID: userId,
            Password: password
        }).then(function(res) {
            dispatch({ type: LOGIN, payload: res.data.user })
        });
    }
}

export function getAuthUser() {
    return function(dispatch) {
        axios.get(`/${folderName}/user`).then(function(res) {
            dispatch({ type: GET_USER, payload: res.data.user });
        });
    }
}

export function logout() {
    return function(dispatch) {
        axios.post(`/${folderName}/logout`).then(function(res) {
            dispatch({ type: LOGOUT })
        })
    }
}
