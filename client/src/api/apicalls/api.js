import axios from "axios";
const headers = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
    }
}

export const getData = async (url) => {
    let response = await axios.get(url, headers);
    return response.data;
}

export const postData = async (url, data) => {
    let response = await axios.post(url, data, headers);
    return response.data;
}


export const updateData = async (url, data) => {
    let response = await axios.put(url, data, headers);
    return response.data;
}

export const deleteData = async (url, data) => {
    let response = await axios.delete(url, headers);
    return response.data;
}