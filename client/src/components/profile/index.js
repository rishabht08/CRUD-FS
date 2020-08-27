import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import * as userApi from "../../api/users"
import swal from 'sweetalert';
import ListTasks from "../../containers/listTask"
import AddTask from "../../containers/addTask"
import UserProfile from "../../containers/userProfile"


class Profile extends React.Component {

    render(){
        console.log("dadad" , window.location.href)
        return(
        <div>
            <AddTask updateState = {()=>this.props.updateState()}/>
            <UserProfile profile = {this.props.profile}/>
         
            </div>)
    }
  

}

export default Profile;