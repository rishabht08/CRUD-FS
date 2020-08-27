import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import "./style.css"
import * as userApi from "../../api/users"
import swal from 'sweetalert';




const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

class Register extends React.Component {
    state = {
        name:"",
        email:"",
        password:""

    }

    onChangeHandler = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitForm = (e) =>{
        userApi.registerUser(e).then(res=>{
            console.log("responses" , res)
            if(!res.success){
                swal("Email Duplication", "Email Already Exists", "warning");

            }
            else{
                localStorage.setItem("accessToken" , res.accessToken)
                swal("Succesfully Signed", "Entering.....", "success").then(()=>{
                        window.location.href = "/";
                  
                })

            }

        })

    }

    render() {
        let {password , email , name} = this.state;
        return (
            <Fragment>
                <div className="register">
                    Register
                </div>
                <Form
                    style={
                        {
                            marginTop: "2rem",
                            border: "1px solid #ccc",
                            padding: "2rem",
                            boxShadow: "10px 10px 10px 10px #ccc",
                            width: "80%",
                            margin: "0px auto"
                        }}
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish ={this.submitForm}

                >
                    <Form.Item
                        label="Name"
                        name="name"
                        onChange={this.onChangeHandler}
                        value={name}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        validateMessages={validateMessages}
                        onChange={this.onChangeHandler}
                        value={email}
                        rules={[{ type: 'email'  , required:true}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        onChange={this.onChangeHandler}
                        value={password}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Link to="/login" className="links">Already have Credentials?</Link>
                </Form>
            </Fragment>
        )
    }

}

export default Register;