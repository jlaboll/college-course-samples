import React from 'react';
import {SignUpDiv} from "../src/resources/Styles";
import Button from '@bit/nexxtway.react-rainbow.button';
import {Link} from "react-router-dom";

const css = {margin: 5, background: '#CCB114', color: '#284B63'}

export default class SignUpHome extends React.Component {
    render() {
        return (
            <SignUpDiv className={'signup'}>
                <h1>Sign Up!</h1>
                <h3>Start Trading Today!</h3>
                <Link id={'button_link'} to={'/signup'}
                      onClick={event => document.getElementById('sign_up_item_clickable').click()}>
                    <Button
                        style={css}
                        shaded
                        label="Submit"
                        onClick={event => document.getElementById('button_link').click()}
                        variant="brand"/>
                </Link>
            </SignUpDiv>
        );
    }
}
