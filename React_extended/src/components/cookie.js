import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cookie extends Component {
    render() {
        return (
            <div className="cookie">
                <img
                    onClick={this.props.increment}
                    className="cookieImg"
                    src="../../public/images/cookie-svg-2.png"/>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
   increment: () => {
       dispatch({type: 'increment'})
   }
});
export default connect(null, mapDispatchToProps)(Cookie);