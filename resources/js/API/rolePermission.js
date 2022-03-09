import axios from "axios";
import folderName from "../folderName";

const getRolesWithPermissions = async function() {
    const res = await axios.get(`/${folderName}/roles_permissions`);
    return res.data;
}

export {getRolesWithPermissions};
