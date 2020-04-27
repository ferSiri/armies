import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { MainContext } from '../Contexts/MainContext';

import Login from './Login';
import SignUp from './SignUp';


function Main() {
    const { selectedUser } = useContext(MainContext);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path={"/login"}>
                        <Login />
                    </Route>
                    <Route path={"/signup"}>
                        <SignUp />
                    </Route>
                    <Route path={"/"}>
                        <div>PRINCIPAL</div>
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Registrarme</Link>
                            </li>
                        </ul>
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

export default Main;