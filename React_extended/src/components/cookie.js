import React, {Component} from 'react';
import { connect } from 'react-redux';
import { increment } from "../redux/actions";

class Cookie extends Component {
    render() {
        return (
            <div className="cookie">
                <img
                    onClick={() => {this.props.increment(this.props.scoreCounter)}}
                    className="cookieImg"
                    src="../../public/images/cookie-svg-2.png"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    scoreCounter: state.scoreCounter
});

const mapDispatchToProps = (dispatch) => ({
   increment: (scoreCounter) => {
       dispatch(increment(scoreCounter))
   }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cookie);