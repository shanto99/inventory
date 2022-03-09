import axios from "axios";
import folderName from "../folderName";

const getCompanies = async function() {
    const res = await axios.get(`/${folderName}/companies`);
    return res.data;
}

export {getCompanies};
