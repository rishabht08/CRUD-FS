import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import "./style.css"
import * as userApi from "../../api/users"
import swal from 'sweetalert';
import ListTasks from "../../containers/listTask"
import AddTask from "../../containers/addTask"



class Tasks extends React.Component {

    render(){
        return(
        <div>
            <AddTask updateState = {()=>this.props.updateState()}/>
            <ListTasks tasks = {this.props.tasks} updateState = {()=>this.props.updateState()}/>
            </div>)
    }
  

}

export default Tasks;