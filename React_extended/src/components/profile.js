import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    componentDidMount() {
        this.props.getAvatars(this.props.user.id, this.state.page)
        // getGalleryRequest();
    }

    render() {
        return (
            <div className="profilePage">
                <div className="profile">
                    <div className="leftBlock">
                        {
                            this.props.user.avatars.map(avatar =>
                                <img src={avatar.path} key={avatar.id} className="avatar"/>
                            )
                        }
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

const mapDispatchToProps = (dispatch) => ({
    getAvatars: (id, page) => {
        dispatch({type: 'getAvatarsRequest', id, page})
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);