import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalSlider from './slider';
import Modal from './modal';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpened: false
        }
    }

    showSlider = () => {
        this.setState({isDialogOpened: !this.state.isDialogOpened});
    };

    render() {
        return (
            <>
                {
                    this.state.isDialogOpened &&
                        <Modal hideSlider={this.showSlider}>
                            <ModalSlider />
                        </Modal>
                }
                <div className="profilePage">
                    <div className="profile">
                        <div className="leftBlock">
                            <img className="avatar"
                                 src = {this.props.user.avatars.data.find(
                                     avatar => avatar['isCurrentAvatar']).path}
                                 onClick={this.showSlider}/>
                        </div>
                        <div className="rightBlock">
                            <h1 className="username">{this.props.user.username}</h1>
                            <p>{this.props.user.bio}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(
    mapStateToProps
)(Profile);