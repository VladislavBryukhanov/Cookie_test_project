import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Cookie from './components/cookie';
import Score from './components/score';
import Auth from "./components/auth";
import Navbar from "./components/navBar";
import '../public/css/cookie.scss';
import '../public/css/app.scss';
import '../public/css/score.scss';

class App extends Component {

    componentDidMount() {
        if (localStorage.getItem('AuthToken')) {
            this.props.signIn();
        }
    }

    privateRoutes = [
        '/game'
    ]

    authRoutes = [
        '/',
        '/signUp'
    ]

    routerGuard = () => {
        let targetRoute = this.authRoutes;
        if (this.props.isAuthorized) {
            targetRoute = this.privateRoutes;
        }
        if (!targetRoute.includes(this.props.history.location.pathname)) {
            return (
                <Redirect to={targetRoute[0]}/>
            )
        }
    }

    render() {
        return (
            <Switch>
                {this.routerGuard()}
                {
                    this.props.isAuthorized ? (
                        <>
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
    isAuthorized: state.authReducer.isAuthorized
});

const mapDispatchToProps = (dispatch) => ({
    signIn: () => {
        dispatch({type: 'signIn'})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
