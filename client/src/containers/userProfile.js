import React, { useState  , useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import * as userApi from "../api/users"
import swal from 'sweetalert';

const UserProfile = (props) => {

    const [user_name , setName] = useState("");
    const [user_password , setPassword] = useState("");

    // useEffect(()=>{
    //     setName(props.profile.user_name)

    // } , [user_password])

    const onChangeHandler = (e ,type)=>{
        if(type=="pass"){
            setPassword(e.target.value)
        }
        else{
            setName(e.target.value)
        }
    }

    const submitForm = ()=>{
        let userName = user_name;
        if(userName == ""){
            userName = props.profile.user_name;

        }
        let data = {
            name : userName,
            password:user_password
        }
        userApi.updateUser(data).then(res=>{
            if(res.success){
                swal("Changed", "Info Changed Succesfully", "success").then(()=>{
                    window.location.href = "/"
                })

            }
            else{
                swal("Problen", "There is some problem", "warning");
            }
        })
        
    }
 

  return (
    <Form
    
      layout="vertical"
      style={{width:"80%" , padding:"3rem" , margin:"2rem auto" , boxShadow:"10px 10px 10px 10px #ccc"}}
  
    >
     
      <Form.Item label="Name" required>
        <Input type="text" placeholder={props.profile.user_name} name="user_name" value = {user_name} onChange = {(e)=>onChangeHandler(e,"name")} />
      </Form.Item>
      <Form.Item label="Password">
        <Input type="password" placeholder="input placeholder" name="user_password" value = {user_password}  onChange = {(e)=>onChangeHandler(e,"pass")} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={()=>submitForm()}>Save</Button>
      </Form.Item>
    </Form>
  );
};

export default UserProfile;
