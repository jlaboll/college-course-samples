import React from 'react'

export default class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.user_id,
            uname: props.uname
        }
    }

    render() {
        const user = this.state.uname;
        return (
            <h1>${user}</h1>
        );
    }
}