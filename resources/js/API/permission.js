import axios from "axios"
import folderName from "../folderName";

const getPermissions = async function() {
    const res = await axios.get(`/${folderName}/permissions`);
    return res.data;
}

const createPermission = async function(permission) {
    const res = await axios.post(`/${folderName}/create_permission`, {
        name: permission
    });

    return res.data;
}

const deletePermission = async function(permissionId) {
    const res = await axios.delete(`/${folderName}/delete_permission/${permissionId}`);
    return res.data;
}


export {getPermissions, createPermission, deletePermission};
