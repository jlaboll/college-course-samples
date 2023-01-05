import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, Text, TextInput, View} from 'react-native';
import Button from '@bit/nexxtway.react-rainbow.button'
import {findByLoginUser} from "./services/User_Service"
import {TextBubble} from "../src/resources/Styles";

const css = {margin: 5, background: '#CCB114', color: '#284B63'}

export default class LoginForm extends Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: ''
    }

    _userLogin = () => {

        this.setState({isLoggingIn: true, message: ''});

        let params = JSON.stringify({
            uname: this.state.username,
            psswd: this.state.password
        });
        let user = "no_user";
        findByLoginUser(params)
            .then((response) => {
                if (response.status === 200) {
                    user = response.data.user_id;
                }
                if (response.status === 500) {
                    this.setState({message: "Username or Password incorrect."});
                }
                this.setState({message: response.data.uname});
                document.getElementById('Application').setState({uid: user})
            })
            .then(() => {
                this.setState({isLoggingIn: false})
            })
            .catch(err => {
                if (err.status === 500) this.setState({message: "Username or Password incorrect."});
                else this.setState({message: err.message});
                this.setState({isLoggingIn: false})
            });
    }

    clearUsername = () => {
        this._username.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    clearPassword = () => {
        this._password.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    render() {
        return (
            <ScrollView>
                <TextBubble>
                    Login
                </TextBubble>
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._username = component}
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username: username})}
                    autoFocus={true}
                    onFocus={this.clearUsername}
                />
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._password = component}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password: password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onSubmitEditing={this._userLogin}
                />
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 15, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
                {this.state.isLoggingIn && <ActivityIndicator/>}
                <View style={{margin: 5}}/>
                <Button
                    style={css}
                    shaded
                    disabled={this.state.isLoggingIn || !this.state.username || !this.state.password}
                    label="Submit"
                    onClick={this._userLogin}
                    variant="brand"/>
                <Button
                    style={css}
                    shaded
                    label="Sign Up"
                    onClick={event => window.location.href = '/signup'}
                    variant="brand"/>
            </ScrollView>
        )
    }
}