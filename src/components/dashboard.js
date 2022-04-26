import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Popup from 'reactjs-popup';
import UserInfo from './userInfo';
import 'reactjs-popup/dist/index.css';
import Loading from './loading';


class Dashboard extends React.Component{
    state = {
        user: null,
        todo: '',
        todos: null,
        token: null,
        edit: '',
        welcome: '',
        error: '',
        show: false,
        showProfile: false,
    }


    componentDidMount(){
        const token = localStorage.getItem('token');
        if (!token){
            this.props.history.push('/');
        }
        else{
            fetch('http://localhost:3001/api/user/' + token).then((res)=>{
                return res.json()
            }).then((data)=>{
                this.setState({
                    user: data.user,
                    token: token,
                })
            })
            fetch('http://localhost:3002/todos/', {
                headers: {
                    'auth-token': token,
                }
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                if (!data.message){
                    this.setState({
                        todos: data.todos
                    })
                } else {
                    this.setState({
                        error: data.message
                    })
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    delete = (id) => {
        fetch('http://localhost:3002/todos/' + id, {
            method: 'DELETE',
            headers:{
                'auth-token': this.state.token
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if (!data.message){
                const filteredtodos = this.state.todos.filter((todo)=>{
                    return todo._id !== id
                })
                this.setState({
                    todos : filteredtodos
                })
                window.M.toast({html: 'Todo successfully deleted!'}, 2000);
            }
            else{
                this.setState({
                    error: data.message,
                })
            }
        })
    }

    update = (id) => {
        const todo = {title: this.state.edit};
        fetch('http://localhost:3002/todos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': this.state.token,
            },
            body: JSON.stringify(todo)
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if (!data.message){
                fetch('http://localhost:3002/todos/', {
                    headers:{
                        'auth-token': this.state.token
                    }
                }).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    this.setState({
                        todos: data.todos
                    })
                })
                this.setState({
                    edit: '',
                    show: false
                })
                window.M.toast({html: 'Todo updated!'}, 2000);
            } else {
                this.setState({
                    error: data.message
                })
                setTimeout(()=>{
                    this.setState({
                        error: ''
                    })
                }, 2000)
            }
        })
    }

    submit = (e) => {
        const todo = {title: this.state.todo};
        fetch('http://localhost:3002/todos/', {
        method: 'POST',
        headers:{
        'Content-Type': 'application/json',
        'auth-token': this.state.token,
            },
            body: JSON.stringify(todo)
        }).then((res) => {
            return res.json()
        }).then((data)=>{
            if (!data.message){
                const todo = data.todo;
                const todos = this.state.todos;
                this.setState({
                    todos : [...todos, todo],
                    todo: ''
                })
                window.M.toast({html: 'Todo successfully created!'}, 2000);
        } else {
            this.setState({
                error: data.message,
            })
            setTimeout(()=>{
                this.setState({
                    error: ''
                });
            }, 3000)
        }
        })
    }


    render () {
        const state = this.state
        const userInfo = state.user ? <h5>Let's get things done today {state.user.name}!</h5> : <p></p>
        const todos = state.todos ? state.todos.length === 0 ? () => this.setState({welcome: 'No todos found'}) : state.todos.map((todo)=>{
            return (
                <li className="collection-item" key = {todo._id}><div>{todo.title}<a href="#!" class="secondary-content">
                <i className="material-icons" onClick = {() => {this.setState({show: true, edit: todo.title}); console.log("edit:" + state.edit)}}>edit</i>
                <Popup open = {state.show} position="bottom right" modal>
                <div className="edit-todo">r
                    <input type="text" value={state.edit === '' ? '': state.edit} id="edit" onChange={ this.handleChange} placeholder="Edit your todo.."/>
                    <a className="waves-effect waves-light btn" onClick={() => this.update(todo._id)}>Update todo</a>
                    </div>
                </Popup>
                <i className="material-icons" onClick={() => this.delete(todo._id)}>delete</i><br/>
                </a></div></li>
            )
        }) : <Loading/>
        return(
            <div>
            <nav>
            <div className="nav-wrapper grey">
            <Link to="/dashboard" className="brand-logo" style={{color: "black"}}>To do Application</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li style={{color: "black"}}><a onClick={()=> this.setState({showProfile: !state.showProfile})}>Your Profile</a></li>
                <li style={{color: "black"}}><a onClick={() => {localStorage.removeItem('token');
                this.props.history.push('/');}}>Log out</a></li>
            </ul>
            </div>
            </nav>
            {state.showProfile ? <UserInfo/> : <p></p>}
            <div className="dashboard">
            <div className="center">
            {userInfo}
            <form onSubmit={this.submit}>
                <textarea className="materialize-textarea" type="text" value={state.todo} id= "todo" placeholder="Add a new todo.." onChange={this.handleChange}/>
                <a className="waves-effect waves-light btn" onClick={this.submit} disabled={state.todo !== '' ? false : true} type="submit">Add</a>
            </form>
            <p style={{color:"red"}}>{state.error}</p>
            </div>
            { state.todos ? state.todos.length === 0 ? <p className="center">No todos found</p> : <p></p> : <div></div>} 
            <ul className="collection" style={{display: state.todos ? state.todos.length === 0 ? 'none' : 'block' : 'none'}}>
            {todos}
            </ul>
            </div>
            </div>
        )
    }
}

export default Dashboard;