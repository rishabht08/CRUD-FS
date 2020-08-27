import React from "react";
import { Table } from "react-bootstrap"
import * as taskApi from "../api/tasks"

class ListTask extends React.Component {

    state = {
        editIndex: null
    }



    deleteTask = (id) => {
        taskApi.deleteTask(id).then(res => {
            this.props.updateState();
        })

    }

    startEdit = (index) => {

        this.setState({
            editIndex: index,
            task_name: this.props.tasks[index].task_name,
            task_status: this.props.tasks[index].task_status,
            task_date: this.props.tasks[index].task_date,
        })

    }
    stopEdit = (id) => {

        let data = {};
        data.task_name  = this.state.task_name;
        data.task_status = parseInt(this.state.task_status);
        data.task_date = this.state.task_date;
       
        taskApi.updateTask(id , data).then(res=>{
            console.log(res)
            this.props.updateState();
            this.setState({
                editIndex: null
            })
        })
       
    }

    onChaneHandler = (e)=>{
        console.log(typeof(e.target.value) , "and" , e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        let {task_name , task_status , task_date} = this.state;

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Todo Name</th>
                            <th>Status</th>
                            <th>Completion Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map((item, index) => (
                            this.state.editIndex !== index ?
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.task_name}</td>
                                    <td>{item.task_status == 0 ? "Incomplete" : "Complete"}</td>
                                    <td>{item.task_date.split("T")[0]}</td>
                                    <td><button onClick={() => this.startEdit(index)}>Edit</button></td>
                                    <td><button onClick={() => this.deleteTask(item.task_id)}>Delete</button></td>
                                </tr> :
                                <tr>
                                    <td>{index + 1}</td>
                                    <td><input type="text" name="task_name" value={task_name} onChange={this.onChaneHandler}></input></td>
                                    <td> <select name="task_status" id="status" value={task_status} onChange={this.onChaneHandler}>
                                        <option value={0}>Incomplete</option>
                                        <option value={1}>Complete</option>
                                    </select></td>
                                    <td><input name="task_date" type="date" onChange={this.onChaneHandler}></input></td>
                                    <td><button onClick={() => this.stopEdit(item.task_id)}>Save</button></td>

                                </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        )
    }


}

export default ListTask;