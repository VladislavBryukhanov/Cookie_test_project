import React, {Component} from 'react';
import { connect } from 'react-redux';
import {logOut} from "../redux/actions";

class Navbar extends Component {
    render() {
        return (
            <>
                <button onClick={this.props.logOut}>Log out</button>
                <hr/>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut())
    }
});

export default connect(null, mapDispatchToProps)(Navbar);