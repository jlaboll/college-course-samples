import {userContext} from './userContext';
import Container from "react-bootstrap";
import React from "react";

export function UserLoggedIn(props) {
    return (
        <Container>
            <userContext.Consumer>
                {({user, logoutUser}) => {
                    return (
                        <Container>
                            <Avatar user={user}/>
                            <LogoutButton onClick={logoutUser}/>
                        </Container>
                    )
                }}
            </userContext.Consumer>
        </Container>
    )
}