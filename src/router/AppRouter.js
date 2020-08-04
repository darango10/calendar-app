import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import {useDispatch, useSelector} from "react-redux";
import {startChecking} from "../actions/auth";
import PublicRoutes from "./PublicRoute";
import PrivateRoutes from "./PrivateRoute";
import {eventStartLoading} from "../actions/events";

const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Checking...</span>
            </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes exact path="/login" component={LoginScreen} isAuthenticated={!!uid}/>
                    <PrivateRoutes exact path="/" component={CalendarScreen} isAuthenticated={!!uid}/>
                    <Redirect to={'/'}/>
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
