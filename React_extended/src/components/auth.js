import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//TODO in & up = one component
class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    onLoginChange = (e) => {
        this.setState({login: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    onSignIn = (e) => {
        e.preventDefault();
        axios.post('/signIn', this.state)
            .then(res => {
                this.props.signIn(res.data.token);
            })
    }

    onSignUp = (e) => {
        e.preventDefault();
        axios.post('/signUp', this.state)
            .then(res => {
                this.props.signIn(res.data.token);
            })
    }

    render() {
        return (
            !this.props.isSignUp ?
            <div>
                <h1>Sign in</h1>
                <form>
                    <input onChange={this.onLoginChange} value={this.state.login} placeholder="login"/>
                    <input onChange={this.onPasswordChange} value={this.state.password} placeholder="password"/>
                    <hr/>
                    <button onClick={this.onSignIn}>Sign in</button>
                    |
                    <Link to="/signUp">Sign up</Link>
                </form>
            </div>
                :
            <div>
                <h1>Sign up</h1>
                <form>
                    <input onChange={this.onLoginChange} value={this.state.login} placeholder="login"/>
                    <input onChange={this.onPasswordChange} value={this.state.password} placeholder="password"/>
                    <hr/>
                    <button onClick={this.onSignUp}>Sign up</button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    signIn: (token) => {
        dispatch({type: "signIn", token: token});
    }
})

export default connect(null, mapDispatchToProps)(Auth);