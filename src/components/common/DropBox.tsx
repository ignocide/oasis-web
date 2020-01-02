import React from 'react';
import { findDOMNode } from 'react-dom';
import Floater from './Floater';

// https://github.com/FezVrasta/popper.js#installation
interface IProps {
  isOpen: boolean;
  parent?: any,
  requestClose: Function;
  // floaterRenderInfo: IFloaterRenderInfo
}

interface IState {
  beforeIsOpen: boolean;
}

class DropBox extends React.Component<IProps, IState> {
  state = {
    beforeIsOpen: true
  };

  //
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    const { parent, isOpen } = props;
    const { beforeIsOpen } = state;
    let { parentPosition } = state;
    //닫았다가 열었을 경우
    if (isOpen && !beforeIsOpen) {
      const node: Element = findDOMNode(parent);
      const rect = node.getBoundingClientRect();
      parentPosition = {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right
      };
    }

    return {
      beforeIsOpen: isOpen,
      parentPosition: parentPosition
    };
  }

  componentDidMount() {

  }

  get floaterRenderInfo() {
    const { parentPosition } = this.state;

    return {
      mouseClickedPosition: { ...window.floaterRenderInfo.mouseClickedPosition },
      parentPosition
    };
  }

  render() {
    const { isOpen, children, requestClose } = this.props;
    if (!isOpen) {
      return null;
    }

    return <Floater requestClose={requestClose} floaterRenderInfo={this.floaterRenderInfo}>{children}</Floater>;
  }
}

export default DropBox;