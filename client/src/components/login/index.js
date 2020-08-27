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

class Login extends React.Component {
    state = {
        password:"",
        email:""

    }
    onChangeHandler = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitForm = (e) =>{
        userApi.loginUser(e).then(res=>{
            console.log("responses" , res)
            if(!res.success){
                swal("Wrong Credentials", "Enter right Creds", "warning");

            }
            else{
                localStorage.setItem("accessToken" , res.accessToken)
                swal("Succesfully loggedIn", "Entering.....", "success").then(()=>{
                        window.location.href = "/";
                  
                })

            }

        })

    }

    render() {
        let {email , password} = this.state;
        return (
            <Fragment>
                <div className="login">
                    Sign In
                </div>
                <Form
                  onFinish ={this.submitForm}
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
                    validateMessages={validateMessages}
                    initialValues={{
                        remember: true,
                    }}

                >


                    <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        onChange={this.onChangeHandler}
                        value={email}
                    
                        rules={[{ type: 'email' , required:true }]}
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
                    <Link to="/register" className="links">Dont have the Credentials?</Link>
                </Form>
            </Fragment>
        )
    }

}

export default Login;