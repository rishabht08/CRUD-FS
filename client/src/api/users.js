
import * as api from "./apicalls/api"

export const registerUser = (data)=>{
    return api.postData(`${process.env.REACT_APP_URL}/api/user/register` , data).then(res=>{
        return res;

    })
    
}

export const loginUser = (data)=>{
    return api.postData(`${process.env.REACT_APP_URL}/api/user/login` , data).then(res=>{
        return res;
    })
}

export const verifyToken  = ()=>{
    return api.getData(`${process.env.REACT_APP_URL}/api/user/get`).then(res=>{
        return res;
    })
}

export const updateUser = (data)=>{
    return api.updateData(`${process.env.REACT_APP_URL}/api/user/update` , data).then(res=>{
        return res;
    })
}