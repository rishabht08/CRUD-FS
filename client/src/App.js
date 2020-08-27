import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Register from "./components/register/index";
import Login from "./components/login/index";
import NavBar from './components/navigation';
import * as userApi from "./api/users"
import * as taskApi from "./api/tasks"
import Tasks from "./components/task/index"
import Profile from "./components/profile/index"


class App extends React.Component {

  state = {
    login: false,
    profile: {},
    tasks: []
  }

  componentWillMount = () => {
    this.checkToken()
    if (localStorage.getItem('accessToken')) {
    this.loadTasks();
    }

  }

  checkToken = () => {
    if (localStorage.getItem('accessToken')) {
      this.setState({
        login:true
      })
   


    }
    else if (!localStorage.getItem('accessToken')) {
      this.setState({
        login: false
      })
    }

  }

  loadTasks = () =>{
    userApi.verifyToken().then(res => {
      console.log("after res===>", res.data[0], localStorage.getItem('accessToken'))
      taskApi.getUserTasks().then(resp => {
        console.log("Tasks", resp.data)
        this.setState({
          profile: res.data[0],
          tasks: resp.data
         
        })
      })

    })
  }



  render() {
    return (

      <Router>
        <Route path="/" exact render={() => (
          this.state.login ? (<Tasks tasks={this.state.tasks} updateState = {()=>this.loadTasks()} />) : (<Redirect to="/login" />)

        )} />
        <Route path="/register" exact render={() => {
          return (
            <Register />

          )
        }} />

        <Route path="/login" exact render={() => {
          return (
            <Login />

          )
        }} />
        {/* {this.state.login &&
            <NavBar/>} */}

        <Route path="/profile" exact render={() => {
          return (<div>{this.state.login ? <Profile profile = {this.state.profile}/> : <Redirect to="/login" />}</div>)
        }} />

      </Router>



    )
  }
}

export default App;




