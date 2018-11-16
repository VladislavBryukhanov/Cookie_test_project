import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navBar">
                <div  className="navigation">
                    <Link to="/game">Game</Link>
                </div>
                <div className="profile">
                    <img className="userAvatar"
                         src="http://localhost:3000/images/def.png"
                         onClick={() => this.props.history.push('/myProfile')}/>
                    <a className="username"
                       onClick={() => this.props.history.push('/editProfile')}>{this.props.user.username}</a>
                    <a className="logOutBtn"
                            onClick={() => this.props.logOut(this.props.scoreCounter)}>
                        Log out
                    </a>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logOut: (scoreCounter) => {
        dispatch({type: 'logOutRequest', scoreCounter: scoreCounter})
    }
});

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    scoreCounter: state.scoreReducer.scoreCounter
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Navbar);