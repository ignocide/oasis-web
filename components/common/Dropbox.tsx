import React from 'react';
import Floater, { FloaterRenderInfo } from "./Floater";

interface IProps {
  // DropBox
  box: any
}


class DropBox extends React.Component<IProps, any> {

  state = {
    isOpen: false,
    floaterRenderInfo: null,
  };

  openDropBox = (e) => {
    this.setState({
      isOpen: true,
      floaterRenderInfo: new FloaterRenderInfo(e)
    });
  };

  closeDropBox = () => {
    this.setState({
      isOpen: false,
      floaterRenderInfo: null
    });
  };

  render() {
    const { children, box } = this.props;
    const { isOpen, floaterRenderInfo} = this.state;
    return [
      <span onClick={this.openDropBox} key={'parent'} >{children}</span>,
      isOpen && <Floater requestClose={this.closeDropBox} floaterRenderInfo={floaterRenderInfo}>{box}</Floater>
    ];
  };
}

export default DropBox;