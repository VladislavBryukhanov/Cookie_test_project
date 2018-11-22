import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.root = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    dialogClosing = (e) => {
        if (e.target.className === 'modalBackground') {
            this.props.hideSlider();
        }
    };

    render() {
        return ReactDom.createPortal(
            <div className="modalBackground" onClick={this.dialogClosing}>
                {this.props.children}
            </div>,
            this.root);
    }
}
export default Modal;