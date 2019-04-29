import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";

interface IProps {
  children: any,
  requestClose: () => void,
  floaterRenderInfo: IFloaterRenderInfo
}

interface IState {
  position: {
    top: number,
    bottom: number,
    left: number,
    right: number,
    x: number,
    y: number
  },
  isOpen: boolean
}

class Floater extends React.Component<IProps, IState> {

  static defaultProps = {
    requestClose: function () {
    },
    parent: null
  };

  state = {
    isOpen: false,
    position: {}
  };

  el: HTMLElement;
  modalRoot: HTMLElement;
  duration: number = 225;

  constructor(props) {
    super(props);
    this.modalRoot = typeof window !== 'undefined' && document.getElementById('floater-container');

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

  get floaterStyle() {
    const { parentPosition, mouseClickedPosition } = this.props.floaterRenderInfo;
    let originX = mouseClickedPosition.x - parentPosition.left;
    let originY = mouseClickedPosition.y - parentPosition.top;
    return {
      left: `${parentPosition.left}px`,
      top: `${parentPosition.top}px`,
      transformOrigin: `${originX}px ${originY}px`
    };
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return ReactDOM.createPortal(
      <div className={'floater-blur'} onClick={this.requestClose}>
        <CSSTransition in={isOpen} timeout={this.duration} classNames="popup">
          <div className="floater" onClick={this.prevent} style={this.floaterStyle}>{children}</div>
        </CSSTransition>
      </div>,
      this.el,
    );
  }
}


interface IFloaterRenderInfo {
  parentPosition: {
    top: number,
    left: number,
    bottom: number,
    right: number,
  },
  mouseClickedPosition: {
    x: number,
    y: number,
  }
}


class FloaterRenderInfo implements IFloaterRenderInfo {
  parentPosition: { top: number; left: number; bottom: number; right: number };
  mouseClickedPosition: { x: number; y: number };

  constructor(event: any) {
    const rect: ClientRect = event.target.getBoundingClientRect();
    this.mouseClickedPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    this.parentPosition = {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right
    };
  }
}

export { IFloaterRenderInfo,FloaterRenderInfo };
export default Floater;