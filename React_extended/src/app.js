import React, {Component} from 'react';
import Cookie from './components/cookie';
import Score from './components/score';
import '../public/css/cookie.scss';
import '../public/css/app.scss';
import '../public/css/score.scss';
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from "./components/auth";
import Navbar from "./components/navBar";
import {connect} from 'react-redux';
import {signIn} from './redux/actions';

class App extends Component {
    componentDidMount() {
        if (!this.props.isAuthorized) {
            if (localStorage.getItem('AuthToken')) {
                this.props.signIn();
            }
        }
    }

    render() {
        return (
            <Switch>
                {
                    this.props.isAuthorized ? (
                        <>
                            <Redirect from="/" to="/game"/>
                            <Route exact path="/game" render={()=>(
                                <>
                                    <Navbar/>
                                    <div className="appBody">
                                        <Cookie/>
                                        <Score/>
                                    </div>
                                </>
                            )} />
                        </>
                    ) : (
                        <>
                            <Redirect exact from="/game" to="/"/>
                            <Route path="/signUp" component={()=><Auth isSignUp={true}/>}/>
                            <Route exact path="/" component={Auth}/>
                        </>
                    )
                }
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.isAuthorized
})

const mapDispatchToProps = (dispatch) => ({
    signIn: () => {
        dispatch(signIn({isLocalToken: true}))
    }
})

export default connect (mapStateToProps, mapDispatchToProps)(App);
