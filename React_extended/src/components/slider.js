import React, { Component } from 'react';
import { connect } from 'react-redux';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.page = 0;
    }

    componentDidMount() {
        this.props.getAvatars(this.props.user.id, this.page);
        // getGalleryRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.avatars.data.length > this.props.user.avatars.data.length) {
            this.nextImage();
        }
        // else if (nextProps.user.avatars.data.length < this.props.user.avatars.data.length) {
            // this.prevImage();
        // }
    }

    nextImage = () => {
        if (this.state.index + 1 < this.props.user.avatars.data.length) {
            this.setState({index: this.state.index + 1});
        } else if(this.props.user.avatarsCount < this.props.user.avatars.data.length) {
            ++this.page;
            this.props.getAvatars(this.props.user.id, this.page)
        } else {
            this.setState({index: 0});
        }
    };

    prevImage = () => {
        if (this.state.index - 1 > -1
            && this.state.index - 1 < this.props.user.avatars.data.length) {
            this.setState({index: this.state.index - 1});
        } else {
            this.setState({index: this.props.user.avatars.data.length - 1});
        }
    };

    deleteAvatar = () => {
        this.props.deleteAvatar(
            this.props.user.avatars.data[this.state.index].id);
    };

    dialogClosing = (e) => {
        if (e.target.className !== 'slider') {
            e.stopPropagation();
        }
    };


    render() {
        return (
            <div className="modalBackground" onClick={this.dialogClosing}>
                <div className="slider">
                    <div className="viewer">

                        {this.props.user.avatars.data.length > 1 &&
                            <div className="controllers">
                                <button className="prevBtn" onClick={this.prevImage}>
                                    <img src="../../public/images/prev-arrow4.png"/>
                                </button>

                                <button className="nextBtn" onClick={this.nextImage}>
                                    <img src="../../public/images/next-arrow4.png"/>
                                </button>
                            </div>
                        }
                        <button onClick={this.deleteAvatar}
                                className="deleteAvatar">
                            <img src="../../public/images/recycle.png"/>
                        </button>
                        <button onClick={this.deleteAvatar}
                                className="favoriteAvatar">
                            <img src="../../public/images/favorite.png"/>
                        </button>
                        <img src={this.props.user.avatars.data[this.state.index].path}/>
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
    },
    deleteAvatar: (id) => {
        dispatch({type: 'deleteAvatarRequest', id: id})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);