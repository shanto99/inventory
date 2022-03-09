import axios from "axios";
import folderName from "../folderName";

const getSubMenus = async function() {
    const res = await axios.get(`/${folderName}/sub_menus`);
    return res.data;
}

const createSubMenu = async function(title, name, menu, permission) {
    const res = await axios.post(`/${folderName}/create_sub_menu`, {title, name, menu, permission});
    return res.data;
}

export {getSubMenus, createSubMenu};
