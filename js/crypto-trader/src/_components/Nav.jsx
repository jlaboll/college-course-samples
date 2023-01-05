import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import {CustomBar} from '../resources/Styles'
function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <CustomBar>
            <nav className="navbar navbar-expand">
                <div className="navbar-nav">
                    <NavLink exact to="/" className="nav-item nav-link" style={{fontsize: "200%",
                        color: "#CCB114",
                        hover: { color: "#E7ECEF" }}}>Practice-Crypto</NavLink>
                    <NavLink to="/about" className="nav-item nav-link" style={{color: "#E7ECEF"}}>About</NavLink>
                    <NavLink to="/live-trading" className="nav-item nav-link" style={{color: "#E7ECEF"}}>Trading</NavLink>
                    <NavLink to="/coin-browser" className="nav-item nav-link" style={{color: "#E7ECEF"}}>Browse Coins</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link" style={{color: "#E7ECEF"}}>Profile</NavLink>
                    <a onClick={accountService.logout} className="nav-item nav-link" style={{color: "#E7ECEF"}}>Logout</a>
                    {user.role === Role.Admin &&
                    <NavLink to="/admin" className="nav-item nav-link" style={{color: "#E7ECEF"}}>Admin</NavLink>
                    }
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
        </CustomBar>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav };