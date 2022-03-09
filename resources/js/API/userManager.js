import axios from "axios";
import folderName from "../folderName";

const getUserWithPagination = async function(pageNo) {
    const res = await axios.get(`/${folderName}/users_pagination/${pageNo}`);
    return res.data;
}

const createUser = async function(userId, name, email, designation, password, roles, permissions) {
    const res = await axios.post(`/${folderName}/create_user`, {
        userId, name, email, password, roles, permissions, designation
    });
    return res.data;
}

export {getUserWithPagination, createUser};
