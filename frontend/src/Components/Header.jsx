import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Button } from "react-bootstrap";


class Header extends Component {
    render() {
        return (
            <Navbar  bg="dark" variant="dark" sticky="top"  expand='lg'>
                <Navbar.Brand >GitHub LinkedIn Integration</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
            </Navbar>
        )
    }
}
export default Header
