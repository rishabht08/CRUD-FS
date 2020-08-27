
import * as api from "./apicalls/api"

export const getUserTasks = ()=>{
    return api.getData(`${process.env.REACT_APP_URL}/api/todos`).then(res=>{
        return res;

    })
}

export const addUserTask = (data)=>{
    return api.postData(`${process.env.REACT_APP_URL}/api/todos/create` , data).then(res=>{
        return res;

    })

}

export const deleteTask = (id)=>{
    return api.deleteData(`${process.env.REACT_APP_URL}/api/todos/delete/${id}`).then(res=>{
        return res;

    })

}

export const updateTask = (id , data)=>{
    return api.postData(`${process.env.REACT_APP_URL}/api/todos/update/${id}` , data).then(res=>{
        return res;

    })

}
    
