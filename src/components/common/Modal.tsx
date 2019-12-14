import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ModalConsumer } from '../context/Modal';
import '../../style/modal.scss';


interface IProps {
  children: any;
  requestClose: () => void;
  modalContext?: any;

}

@ModalConsumer
class Modal extends React.Component<IProps, any> {

  static defaultProps = {
    requestClose: function () {
    }
  };

  el: HTMLElement;
  modalRoot: HTMLElement;
  duration = 225;
  modalKey: number = null;

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
    const { modalContext } = this.props;
    this.modalRoot.appendChild(this.el);
    document.body.style['overflow-y'] = 'hidden';
    this.modalKey = modalContext.push();

    this.changeOpenState(true);
  }

  componentWillUnmount() {
    const { modalContext } = this.props;
    this.modalRoot.removeChild(this.el);
    document.body.style['overflow-y'] = null;
    modalContext.removeKey(this.modalKey);

  }


  changeOpenState = (bool: boolean, callback: any = null) => {
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
    const { children, modalContext } = this.props;
    const { isRender } = modalContext;
    return ReactDOM.createPortal(
      <div id={'modal-blur'} onClick={this.requestClose} style={{
        display: !isRender(this.modalKey) && 'none'
      }}>
        <CSSTransition in={isOpen && isRender(this.modalKey)} timeout={this.duration} classNames="fade">
          <div id="modal-wrapper">
            <div id="modal-main" onClick={this.prevent}>
              {children}
            </div>
          </div>
        </CSSTransition>
      </div>,
      this.el,
    );
  }
}


export const modalController = (_this: any, key: string) => {
  _this.state = _this.state || {};

  _this.state = {
    ..._this.state,
    modalState: {
      ..._this.state.modalState,
      [key]: false
    }
  };

  let functionName = key;
  functionName = functionName.replace(functionName.charAt(0), functionName.charAt(0).toUpperCase());
  const setFunctionName = `set${functionName}Modal`;
  const openFunctionName = `open${functionName}Modal`;
  const closeFunctionName = `close${functionName}Modal`;

  // _this[functionName] =  (bool: boolean) => {
  //   _this.setState({
  //     modalState: {
  //       ..._this.state.modalState,
  //       [key]: bool
  //     }
  //   });
  // };

  _this[setFunctionName] = setModal(key).bind(_this);
  _this[openFunctionName] = openModal(key).bind(_this);
  _this[closeFunctionName] = closeModal(key).bind(_this);

};


const setModal = function (key: string) {
  return function (bool: boolean) {
    this.setState({
      modalState: {
        ...this.state.modalState,
        [key]: bool
      }
    });
  };
};


const openModal =  function (key: string) {
  return function () {
    this.setState({
      modalState: {
        ...this.state.modalState,
        [key]: true
      }
    });
  };
};



const closeModal =  function (key: string) {
  return function () {
    this.setState({
      modalState: {
        ...this.state.modalState,
        [key]: false
      }
    });
  };
};


export default Modal;