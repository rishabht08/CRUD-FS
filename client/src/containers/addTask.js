import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import * as taskApi from "../api/tasks"

class AddTask extends React.Component {

    state = {
        task_name: "",
        task_status: 0,
        task_date: new Date()
    }

    onChangeHandler = (e) => {
        console.log(typeof (e.target.value))
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAdd = () => {
        taskApi.addUserTask(this.state).then(res => {
            this.props.updateState();
        })
    }

    logout = ()=>{
        localStorage.clear();
        window.location.reload();

    }

    render() {
        let { task_name, task_date } = this.state

        return (
            <Navbar bg="light" variant="light">
                <Form inline>
                    <FormControl name="task_name" type="text" placeholder="To Do Name" className="mr-sm-2" onChange={this.onChangeHandler} value={task_name} />
                    <FormControl name="task_date" type="date" className="mr-sm-2" onChange={this.onChangeHandler} />
                    <Button variant="outline-primary" onClick={() => this.onAdd()}>Add Todo</Button>
                </Form>
                <Nav style={{marginLeft:"45%"}}>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <input type="button" value="Logout"style={{marginLeft:"1rem"}} onClick={()=>this.logout()}/>
                </Nav>
            </Navbar>
        )
    }


}

export default AddTask;