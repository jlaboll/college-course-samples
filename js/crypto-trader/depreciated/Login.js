import React from "react";
import {LoginContainer} from "../src/resources/Styles";
import LoginForm from "./LoginForm";


export class Login extends React.Component {
    render() {
        return (
            <LoginContainer>
                <LoginForm/>
            </LoginContainer>
        );
    }
}

