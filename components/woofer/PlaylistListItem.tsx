import React from 'react';
import Playlist from "../../vo/woofer/playlist";
import { Button, IconButton } from "../form/index";
import DropBox from "../common/DropBox";
import { Menu, MenuItem } from "../common/MenuForm";
import { FloaterRenderInfo } from "../common/Floater";
import { default as Modal, modalController } from "../common/Modal";
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from "../common/ModalForm";
import PlaylistRemoveModal from "./PlaylistRemoveModal";

interface IProps {
  playlist: Playlist
}


interface IState {

}

class PlaylistListItem extends React.Component<IProps, any> {
  state = {
    isBoxOpen: false,
    floaterRenderInfo: null,
    isRemoveConfirmModalOpen: false,
  };


  constructor(props) {
    super(props);
    modalController(this,'removeConfirm')
  }

  componentDidMount() {
  }

  openBox = (e) => {
    this.setState({
      isBoxOpen: true,
      floaterRenderInfo: new FloaterRenderInfo(e)
    });
  };

  closeBox = () => {
    this.setState({
      isBoxOpen: false,
      floaterRenderInfo: null
    });
  };


  render() {
    const { playlist } = this.props;
    const { isBoxOpen, floaterRenderInfo,modalState } = this.state;

    return <li className="playlist-item">
      <div onClick={this.onClickPlaylist}>
        {playlist.name}
      </div>
      <IconButton name={'more'} onClick={this.openBox} />
      <DropBox isOpen={isBoxOpen} floaterRenderInfo={floaterRenderInfo} requestClose={this.closeBox}>
        <Menu>
          {/*<MenuItem>{'수정'}</MenuItem>*/}
          <MenuItem onClick={this.openRemoveConfirmModal}>{'삭제'}</MenuItem>
        </Menu>
        {modalState.removeConfirm && <PlaylistRemoveModal playlist={playlist} requestClose={this.closeRemoveConfirmModal}/>}
      </DropBox>
    </li>;
  }
}

export default PlaylistListItem;