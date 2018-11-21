import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalSlider from './slider';
import ReactDom from 'react-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // page: 0,
            isDialogOpened: false
        }
    }
    //
    // componentDidMount() {
    //     this.props.getAvatars(this.props.user.id, this.state.page)
    //     // getGalleryRequest();
    // }

    showSlider = () => {
        this.setState({isDialogOpened: !this.state.isDialogOpened});
    };

    render() {
        return (
            <>
                {
                    this.state.isDialogOpened &&
                        ReactDom.createPortal(
                            <div onClick={this.showSlider}>
                                <ModalSlider />
                            </div>,
                            document.getElementById('modalRoot')
                        )
                }
                <div className="profilePage">
                    <div className="profile">
                        <div className="leftBlock">
                            <img className="avatar"
                                 src = {this.props.user.avatars.data.find(
                                     avatar => avatar['isCurrentAvatar']).path}
                                 onClick={this.showSlider}/>
                            {/*{
                                this.props.user.avatars.map(avatar =>
                                    <img src={avatar.path}
                                         key={avatar.id}
                                         onClick={() => this.props.deleteAvatar(avatar.id)}
                                         className="avatar"/>
                                )
                            }*/}
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

/*
const mapDispatchToProps = (dispatch) => ({
    getAvatars: (id, page) => {
        dispatch({type: 'getAvatarsRequest', id, page})
    },
    deleteAvatar: (id) => {
        dispatch({type: 'deleteAvatarRequest', id: id})
    }
});
*/

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Profile);