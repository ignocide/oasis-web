import React from 'react';
import Floater, { FloaterRenderInfo, IFloaterRenderInfo } from "./Floater";

interface IProps {
  isOpen: boolean
  // parent: any,
  event: any,
  requestClose: Function,
  // floaterRenderInfo: IFloaterRenderInfo
}

const onClickEvent = (e) => {

}
class DropBox extends React.Component<IProps, any> {
  //
  state = {
    floaterRenderInfo: null,
  };
  //
  // openDropBox = (e) => {
  //   this.setState({
  //     isOpen: true,
  //     floaterRenderInfo: new FloaterRenderInfo(e)
  //   });
  // };
  //
  // closeDropBox = () => {
  //   this.setState({
  //     isOpen: false,
  //     floaterRenderInfo: null
  //   });
  // };
  render() {
    const { isOpen, children,requestClose ,floaterRenderInfo} = this.props;
    return [
      isOpen ? <Floater requestClose={requestClose} floaterRenderInfo={floaterRenderInfo}>{children}</Floater>: null
    ];
  };
}

export default DropBox;