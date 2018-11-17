import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="profilePage">
                <div className="profile">
                    <div className="leftBlock">
                        <img src="http://localhost:3000/images/def.png" className="avatar"/>
                    </div>
                    <div className="rightBlock">
                        <h1 className="username">{this.props.user.username}</h1>
                        <p>{this.props.user.bio}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(
    mapStateToProps
)(Profile);