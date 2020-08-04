import React from 'react';
import {Redirect, Route} from "react-router-dom";

const PublicRoutes = ({
                           isAuthenticated,
                           component: Component,
                           ...rest
                       }) => {
    return (
        <Route {...rest} component={(props) =>(
            (!isAuthenticated)
                ?<Component{...props}/>
                :<Redirect to={'/'}/>
        )}/>
    );
};

export default PublicRoutes;
