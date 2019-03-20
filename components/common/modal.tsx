import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import '../../style/modal.scss'



interface IProps {
    children: any,
    closeModal: void
}
class Modal extends Component<IProps, any> {

    static defaultProps = {
        closeModal: function () { }
    }

    el: HTMLElement;
    modalRoot: HTMLElement;
    constructor(props) {
        super(props);
        this.modalRoot = typeof window !== 'undefined' && document.getElementById('modal-container');

        this.el = document.createElement('div');
        this.el.setAttribute('id', 'modal')
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    closeModal = () => {
        console.log("!", this.props.closeModal)
        this.props.closeModal();
    }

    render() {
        console.log("!")
        return ReactDOM.createPortal(
            <div id={'modal-blur'} onClick={this.closeModal}>
                <div id="modal-main">{this.props.children}</div>
            </div>,
            this.el,
        );
    }
}

export default Modal