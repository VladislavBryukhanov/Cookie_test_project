import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <form>
                    <input onChange={this.onLoginChange} value={this.state.login} placeholder="login"/>
                    <input onChange={this.onPasswordChange} value={this.state.password} placeholder="password"/>
                    <hr/>
                    <button onClick={(e) => this.props.signIn(e, this.state)}>Sign in</button>
                    |
                    <Link to="/signUp">Sign up</Link>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    signIn: (e, data) => {
        e.preventDefault();
        dispatch({type: 'signInRequest', data: data});
    }
})

export default connect(null, mapDispatchToProps)(Auth);