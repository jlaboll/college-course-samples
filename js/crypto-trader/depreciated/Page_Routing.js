import React from 'react';
import {Container} from "react-bootstrap";
import {BsHouseFill, BsInfoCircleFill, BsPencilSquare, BsPersonFill} from "react-icons/all";

class Page_Routing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                    path: '/',
                    name: 'Home',
                    as: <BsHouseFill/>,
                    key: 1
                },
                {
                    path: '/about',
                    name: 'About',
                    as: <BsInfoCircleFill/>,
                    key: 2
                },
                {
                    path: '/login',
                    name: 'Login',
                    as: <BsPersonFill/>,
                    key: 3
                },
                {
                    path: '/signup',
                    name: 'Sign Up',
                    as: <BsPencilSquare/>,
                    key: 4
                },
                // { //Not being used, as this is an error page.
                //     path: '/NoMatch',
                //     name: 'No Match',
                //     as: <BsFillXCircleFill/>,
                //     key: 4
                // },
            ]
        }
    }

    componentDidMount() {
        const header = document.getElementById('navbar-wrapper').clientHeight;
        this.setState({
            top: header
        });
    }

    changeFocus = (path) => {
        this.setState({activePath: path});
    }

    render() {
        const {items, activePath} = this.state;
        const styles = {
            containerStyle: {
                top: this.state.top,
            }
        };
        const {containerStyle} = styles;
        return (
            <Container style={containerStyle}>
                {
                    items.map((item) => {
                        return (
                            <NavItem path={item.path}
                                     name={item.name}
                                     as={item.as}
                                     onItemClick={this.onItemClick}
                                     active={item.path === activePath}
                                     key={item.key}/>
                        )
                    })
                }
            </Container>
        );
    }

}

