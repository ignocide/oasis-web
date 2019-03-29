import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../style/modal.scss';


interface IProps {
  children: any,
  closeModal: () => void
}

class Modal extends Component<IProps, any> {

  static defaultProps = {
    closeModal: function () {
    }
  };

  el: HTMLElement;
  modalRoot: HTMLElement;
  closeModal = (e) => {
    this.props.closeModal();
  };
  prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  constructor(props) {
    super(props);
    this.modalRoot = typeof window !== 'undefined' && document.getElementById('modal-container');

    this.el = document.createElement('div');
    this.el.setAttribute('id', 'modal');
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
    document.body.style['overflow-y'] = 'hidden';
    // document.body.style['transform'] = `translateY(-${window.pageYOffset}px)`;
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
    document.body.style['overflow-y'] = null;
  }

  render() {

    return ReactDOM.createPortal(
      <div id={'modal-blur'} onClick={this.closeModal}>
        <div id="modal-wrapper">
          <div id="modal-main" onClick={this.prevent}>{this.props.children}</div>
        </div>
      </div>,
      this.el,
    );
  }
}

export default Modal;