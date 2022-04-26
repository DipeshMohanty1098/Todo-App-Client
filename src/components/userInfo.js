import React from 'react';

class UserInfo extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/api/user/' + localStorage.getItem('token')).then((res) => {
            return res.json();
        }).then((data) => {

            this.setState({
                name: data.user.name,
                email: data.user.email
            })
        })
    }

    submit = () => {
        const update = {name: this.state.name, email: this.state.email}
        fetch('http://localhost:3001/api/user/updateInfo/' + localStorage.getItem('token'), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if (!data.message){
                window.M.toast({html: 'Information Updated!'}, 2000);
            }
            else{
                this.setState  ({
                    error: data.message
                })
            }
        })
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    render (){
        const state = this.state;
    return (  
        <div className="user-info">
            <div className="center">
            <h5>Your Profile</h5>
            <form>
            <input type="text" id="name" value={state.name} onChange= {this.handleChange}/>
            <input type="text" id="email" value={state.email} onChange= {this.handleChange}/>
     { //      <div className="password">
         //   <input type="password" id="password" value={state.password} className="password" onChange= {this.handleChange} placeholder="Update password"/>
           // <input type="password" id="passwordCheck" value={state.passwordCheck} className="password" onChange= {this.handleChange} placeholder="Re-type password"/>
           // </div>
    }
            </form>
            <button onClick = {this.submit}>Update?</button>
            <p style={{color: 'red'}}>{state.error}</p>
            </div>
        </div>
    )
    }
}

export default UserInfo;