import React, {Component} from 'react';
import { connect } from 'react-redux';

class ProfileEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            login: '',
            password: '',
            bio: '',
            avatars: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.props.history.push('/myProfile')
        }
    }

    componentDidMount() {
        if (!this.props.isSignIn) {
            this.setState(this.props.user);
        }
    }

    onUsernameChanged = (e) => {
        this.setState({username: e.target.value});
    }

    onLoginChanged = (e) => {
        this.setState({login: e.target.value});
    }

    onPasswordChanged = (e) => {
        this.setState({password: e.target.value});
    }

    onBioChanged = (e) => {
        this.setState({bio: e.target.value});
    }

    onAvatarChanged = (e) => {
        this.setState({avatars: [...e.target.files]});
    }

    render() {
        return (
            this.props.isSignUp ?
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={(e) => this.props.signUp(e, this.state)}>
                    <input onChange={this.onUsernameChanged} name="username" placeholder="Username"/>
                    <input onChange={this.onLoginChanged} name="login" placeholder="Login"/>
                    <input onChange={this.onPasswordChanged} name="password" type="password" placeholder="Password"/>
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
                :
            <form onSubmit={(e) => this.props.editProfile(e, this.state)} className="editProfileForm">
                <div className="field">
                    <label>Avatar</label>
                    <input type="file" multiple onChange={this.onAvatarChanged}/>
                </div>
                <div className="field">
                    <label>Username</label>
                    <input onChange={this.onUsernameChanged}
                           value={this.state.username}
                           placeholder="Username"/>
                </div>
                <div className="field">
                    <label>Login</label>
                    <input onChange={this.onLoginChanged}
                           value={this.state.login}
                           placeholder="Login"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input onChange={this.onPasswordChanged}
                           placeholder="New password"
                           type="password"/>
                </div>
                <div className="field">
                    <label>Bio</label>
                    <textarea onChange={this.onBioChanged}
                              placeholder="About you"
                              value={this.state.bio}>
                    </textarea>
                </div>
                <div className="btnBlock">
                    <input type="submit" value="Save changes" className="saveChanges"/>
                </div>

            </form>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (e, data) => {
        e.preventDefault();
        dispatch({type: 'signUpRequest', data: data});
    },
    editProfile: (e, data) => {
        e.preventDefault();

        let editedUser = new FormData();
        for (let fieldName in data) {
            if (!data[fieldName]) {
                delete data[fieldName];
            } else {
                if (fieldName === 'avatars') {
                    data['avatars'].forEach(avatar => {
                        editedUser.append('avatars', avatar);
                    })
                } else {
                    editedUser.append(fieldName, data[fieldName]);
                }
            }
        }
        dispatch({type: 'editProfileRequest', data: editedUser});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);