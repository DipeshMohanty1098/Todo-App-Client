import Login from './login';
import Register from './register';
import {useState} from 'react';


const SignIn = () => {
    const [login, setLogin] = useState(true);
    return (
        <div className="center">
        {login ? <Login/> : <Register/>}
        <br/>
        <a onClick = {() => setLogin(!login)}>{login ? "Dont have an account? Register here." : "Already have an account? Login."}</a>
        </div>
    )
}

export default SignIn;