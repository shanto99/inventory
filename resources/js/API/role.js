import axios from "axios";
import folderName from "../folderName";

const getRoles = async function() {
    const res = await axios.get(`/${folderName}/roles`);
    return res.data;
}

const createRole = async function(role={}) {
    const res = await axios.post(`/${folderName}/create_role`, role);
    return res.data;
}

const deleteRole = async function(id) {
    const res = await axios.delete(`/${folderName}/delete_role/${id}`);
    return res.data;
}

export {getRoles, createRole, deleteRole};
