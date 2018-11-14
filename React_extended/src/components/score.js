import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class Score extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getScore();

        this.intervalId = setInterval(() => {
            this.props.saveScore(this.props.scoreCounter);
        }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return(
            <div className="score">
                <p className="scoreDigit">
                    Score: {this.props.scoreCounter}
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    scoreCounter: state.scoreCounter
});

const mapDispatchToProps = (dispatch) => ({
    saveScore: (scoreCounter) => {
        dispatch({type: 'saveScoreRequest', scoreCounter: scoreCounter});
    },
    getScore: () => {
        dispatch({type: 'getScoreRequest'})
    }
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Score);