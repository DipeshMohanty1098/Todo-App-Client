import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Wrapper from './components/wrapper';
import UserInfo from './components/userInfo'

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
        <Route exact path= "/" component={Wrapper}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route exact path="/:user_name" component={UserInfo}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;