import React, {Component} from "react";
import {ActivityIndicator, ScrollView, Text, TextInput, View} from 'react-native';
import {TextBubble} from "../src/resources/Styles";
import Button from "@bit/nexxtway.react-rainbow.button";
import {createUser} from "./services/User_Service";

const css = {margin: 5, background: '#CCB114', color: '#284B63'}

export default class SignUp extends Component {

    state = {
        fname: '',
        lname: '',
        email: '',
        uname: '',
        password: '',
        passwd_check: '',
        isSigningUp: false,
        message: ''
    }

    _userSignUp = () => {
        let user = "no_user";
        this.setState({isSigningUp: true, message: ''});
        let params = JSON.stringify({
            fname: this.state.fname,
            lname: this.state.lname,
            uname: this.state.uname,
            email: this.state.email,
            psswd: this.state.password
        });
        if (!this.state.password === this.state.passwd_check) {
            this.setState({message: 'Passwords do not match!'});
        } else {
            var proceed = false;
            createUser(params)
                .then((response) => {
                    if (response.status === 200) {
                        user = response.data.uname;
                        proceed = true;
                    }
                    if (response.status === 500) {
                        //add check for dupe username
                        this.setState({message: "All fields are required."});
                        proceed = false;
                    } else if (this.state.uname === response.data.uname) {
                        //Come back to notify of new account made.

                    }
                })
                .then(() => {
                    this.setState({isSigningUp: false})
                    if (proceed) this.setState({message: user});
                })
                .catch(err => {
                    this.setState({isSigningUp: false})
                });
        }
    }

    clearFirstName = () => {
        this._fname.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    clearLastName = () => {
        this._lname.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    clearUsername = () => {
        this._uname.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    clearEmail = () => {
        this._email.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    clearPassword = () => {
        this._psswd.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    clearPassCheck = () => {
        this._psswd_check.setNativeProps({text: ''});
        this.setState({message: ''});
    }

    render() {
        return (
            <ScrollView>
                <TextBubble>
                    Sign Up
                </TextBubble>
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._fname = component}
                    placeholder='First Name'
                    onChangeText={(fname) => this.setState({fname: fname})}
                    autoFocus={true}
                    onFocus={this.clearFirstName}
                />
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._lname = component}
                    placeholder='Last Name'
                    onChangeText={(lname) => this.setState({lname: lname})}
                    autoFocus={true}
                    onFocus={this.clearLastName}
                />
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._uname = component}
                    placeholder='Username'
                    onChangeText={(uname) => this.setState({uname: uname})}
                    autoFocus={true}
                    onFocus={this.clearUsername}
                />
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._email = component}
                    placeholder='Email (optional)'
                    onChangeText={(email) => this.setState({email: email})}
                    autoFocus={true}
                    onFocus={this.clearEmail}
                />
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._psswd = component}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password: password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                />
                <View style={{margin: 5}}/>
                <TextInput
                    style={{padding: '4px', background: '#94d6d6'}}
                    ref={component => this._psswd_check = component}
                    placeholder='Confirm Password'
                    onChangeText={(passwrd_check) => this.setState({passwrd_check: passwrd_check})}
                    secureTextEntry={true}
                    onFocus={this.clearPassCheck}
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
                    label="Submit"
                    onClick={this._userSignUp}
                    variant="brand"/>
            </ScrollView>
        )
    }
}