import Container from "react-bootstrap";
import {userContext} from "./userContext";
import React from "react";


export function UserNotLoggedIn() {
    return (
        <Container>
            <userContext.Provider value={value}>
                {({user, login}) => {
                    return (
                        <Container>
                            <LoginFields value={value}/>
                            <LoginButton onClick={loginUser}/>
                        </Container>
                    )
                }}
            </userContext.Provider>
        </Container>
    )
}
