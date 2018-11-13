import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

//TODO to reducer
class Score extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/score/getScore')
            .then( res => {
                this.props.getScore(res.data.scoreCounter);
            });

        window.onbeforeunload = () => {
            // is refresh page - will saved, if close - will not
            this.props.saveScore();
            // axios.post('/score/saveScore', {scoreCounter: this.props.scoreCounter});
        }
    }

    componentWillUnmount() {
        window.onbeforeunload = null;
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
    saveScore: () => {
        dispatch({type: 'saveScore'});
    },
    getScore: (scoreCounter) => {
        dispatch({type: 'getScore', scoreCounter: scoreCounter});
    }
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Score);