import {useState} from 'react'
import {BrowserRouter, withRouter, useHistory} from 'react-router-dom';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const history = useHistory();

    const login = async () => {
      const userObj = {email: email, password: password}
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
      }).then((res) => {
        if (res.status === 400){
            return res.json();
        }
        else{
          return res.json();
        }
      }).then((data) => {
        if (data.token){
        //console.log("data:" + data.token);
        localStorage.setItem('token', data.token);
        history.push('/dashboard');
        }
        else{
          setError(data.message);
          setTimeout(()=>{
            setError('')
          }, 5000)
        }
      })
    }

    return (
    <BrowserRouter>
    <div className="wrap" style={{paddingTop: "100px"}}>
    <div className="login">
        <h5>Login</h5>
        <form onSubmit={login}>
        <div className="row s6">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" onChange= {(e) => setEmail(e.target.value)} value = {email} placeholder="Enter Email"/>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate" onChange= {(e) => setPassword(e.target.value)} value = {password} placeholder="Enter Password"/>
        </div>
      </div>
        <a className="waves-effect waves-light btn" onClick={login} type="submit">Login</a>
        </form>
        <p style={{color: "red"}}>{error}</p>
    </div>
    </div>
    </BrowserRouter>
    )
}

export default Login;