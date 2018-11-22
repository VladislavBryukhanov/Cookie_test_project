import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Cookie from './components/cookie';
import Score from './components/score';
import SignIn from "./components/auth";
import ProfileEditor from "./components/profileEditor";
import Navbar from "./components/navBar";
import Profile from "./components/profile";
import '../public/css/cookie.scss';
import '../public/css/app.scss';
import '../public/css/score.scss';
import '../public/css/navbar.scss';
import '../public/css/profile.scss';
import '../public/css/profielEditor.scss';
import '../public/css/slider.scss';

class App extends Component {

    componentDidMount() {
        if (localStorage.getItem('AuthToken')) {
            this.props.getProfile();
        }
    }

    privateRoutes = [
        '/game',
        '/myProfile',
        '/editProfile'
    ]

    authRoutes = [
        '/',
        '/signUp'
    ]

    routerGuard = () => {
        if (!localStorage.getItem('AuthToken') || this.props.user) {

            let targetRoute = this.authRoutes;
            if (this.props.user) {
                targetRoute = this.privateRoutes;
            }
            if (!targetRoute.includes(this.props.history.location.pathname)) {
                return (
                    <Redirect to={targetRoute[0]}/>
                )
            }

        }
    }

    render() {
        return (
            <Switch>
                {this.routerGuard()}
                {
                    this.props.user ? (
                        <>
                        <Navbar/>
                        <div className="appBody">
                            <Route exact path="/game" render={()=>(
                                    <>
                                        <Cookie/>
                                        <Score/>
                                    </>
                                )} />
                            <Route path="/myProfile" component={Profile}/>
                            <Route path="/editProfile" component={ProfileEditor}/>
                        </div>
                        </>
                    ) : (
                        <>
                            <Route path="/signUp" component={()=><ProfileEditor isSignUp={true}/>}/>
                            <Route exact path="/" component={SignIn}/>
                        </>
                    )
                }
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    getProfile: () => {
        dispatch({type: 'getProfileRequest'})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
