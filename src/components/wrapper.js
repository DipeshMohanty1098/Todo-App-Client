import {useEffect, useState} from 'react';
import Dashboard from './dashboard';
import SignIn from './signIn';


const Wrapper = () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, [])

    return (
        <div className="wrapper">
            {token ? <Dashboard/> : <SignIn/>}
        </div>
    )

}

export default Wrapper;