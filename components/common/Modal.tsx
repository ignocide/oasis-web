import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";

import '../../style/modal.scss';


interface IProps {
  children: any,
  requestClose: () => void
}

class Modal extends React.Component<IProps, any> {

  static defaultProps = {
    requestClose: function () {
    }
  };

  el: HTMLElement;
  modalRoot: HTMLElement;
  duration: number = 225;

  state = {
    isOpen: false
  };

  constructor(props) {
    super(props);
    this.modalRoot = typeof window !== 'undefined' && document.getElementById('modal-container');

    this.el = document.createElement('div');
    this.el.setAttribute('id', 'modal');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
    document.body.style['overflow-y'] = 'hidden';
    this.changeOpenState(true);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
    document.body.style['overflow-y'] = null;
  }


  changeOpenState = (bool: boolean, callback: () => void) => {
    this.setState({
      isOpen: bool
    }, () => {
      if (callback) {
        setTimeout(() => {
          callback();
        }, this.duration);
      }
    });
  };

  requestClose = (e) => {
    this.changeOpenState(false, this.props.requestClose);
  };


  prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };


  render() {
    const { isOpen } = this.state;
    const { children } = this.props;
    return ReactDOM.createPortal(
      <CSSTransition in={isOpen} timeout={this.duration} classNames="fade">
        <div id={'modal-blur'} onClick={this.requestClose}>
          <div id="modal-wrapper">
            <div id="modal-main" onClick={this.prevent}>
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>,
      this.el,
    );
  }
}

export default Modal;