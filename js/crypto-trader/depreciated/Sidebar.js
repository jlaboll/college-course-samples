import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {Container} from "react-bootstrap";
import {StyledNavItem, StyledSideNav} from "../src/resources/Styles";
import Button from "@bit/nexxtway.react-rainbow.button";
import items from "../src/resources/CommonRoutes";

const css = {
    alignSelf: 'flex-end',
    justifySelf: 'center',
    marginBottom: 5,
    fontSize: '50%',
    background: '#6e2629',
    color: '#e0d9d9',
    borderColor: 'transparent'
}

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: items
        }
    }

    onItemClick = (path) => {
        this.setState({activePath: path}); /* Sets activePath which causes rerender which causes CSS to change */
    }


    render() {
        const {items, activePath} = this.state;
        return (
            <StyledSideNav>
                {
                    items.map((item) => {
                        return (
                            <NavItem path={item.path}
                                     name={item.name}
                                     as={item.as}
                                     id={item.id}
                                     onItemClick={this.onItemClick}
                                     active={item.path === activePath}
                                     key={item.key}/>
                        )
                    })
                }
                <Container style={{height: '100%'}}>
                    <SpecialButton/>
                </Container>
            </StyledSideNav>
        );
    }

}

class SpecialButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        const width = this.state.width;
        if (width < 768) {
            return <Button
                style={css}
                shaded
                label="Close"
                onClick={event => document.getElementById('navbar-collapse').click(function () {
                    document.getElementById('navbar-collapse').collapse('hide')
                })}
            />
        }
        return null;
    }
}


class NavItem extends React.Component {
    handleClick = () => {
        const {path, onItemClick} = this.props;
        onItemClick(path);
    }

    render() {
        const {active} = this.props;
        const as = this.props.as;
        return (
            <StyledNavItem active={active}>
                <Link to={this.props.path} onClick={this.handleClick} id={this.props.id}>
                    <Container style={{justifyContent: "center", display: 'flex', flexFlow: 'column nowrap'}}>
                        {as}
                        <text>{this.props.name}</text>
                    </Container>
                </Link>
            </StyledNavItem>
        );
    }
}


const RouterSideNav = withRouter(SideNav);
export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav/>
        );
    }
}
