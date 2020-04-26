import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { MainContext } from '../Contexts/MainContext';

import Login from './Login';


function Main() {
    const { selectedUser } = useContext(MainContext);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path={"/login"}>
                        <Login />
                    </Route>
                    <Route path={"/"}>
                        <div>PRINCIPAL</div>
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

export default Main;