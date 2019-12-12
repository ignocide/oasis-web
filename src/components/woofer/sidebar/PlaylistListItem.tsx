import React from 'react';
import { inject } from "mobx-react";
import Link from "next/link";

import Playlist from "../../../dto/woofer/playlist";
import { IconButton } from "../../form/index";
import DropBox from "../../common/DropBox";
import { Menu, MenuItem } from "../../common/MenuForm";
import { FloaterRenderInfo } from "../../common/Floater";
import { modalController } from "../../common/Modal";
import PlaylistRemoveModal from "../PlaylistRemoveModal";
import PlaylistStore from "../../../store/woofer/playlistStore";

interface IProps {
  playlist: Playlist,
  playlistStore: PlaylistStore,
}


interface IState {

}

@inject('playlistStore')
class PlaylistListItem extends React.Component<IProps, any> {
  state = {
    isBoxOpen: false,
    floaterRenderInfo: null,
    isRemoveConfirmModalOpen: false,
  };


  constructor(props) {
    super(props);
    modalController(this, 'removeConfirm');
  }

  componentDidMount() {
  }

  onClickPlaylist = (e) => {
    e.preventDefault();
    const { playlistStore, playlist } = this.props;

    playlistStore.fetch(playlist.id);
  };

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
    const { isBoxOpen, floaterRenderInfo, modalState } = this.state;

    return <li className="playlist-item">
      <div>
        <Link as={`/woofer/playlists/${playlist.id}`} href={`/woofer/playlists?playlistId=${playlist.id}`}>{playlist.name}</Link>
      </div>
      <IconButton name={'more_vert'} onClick={this.openBox} ref={'button'} />
      <DropBox isOpen={isBoxOpen} parent={this.refs.button} requestClose={this.closeBox}>
        <Menu>
          {/*<MenuItem>{'수정'}</MenuItem>*/}
          <MenuItem onClick={this.openRemoveConfirmModal}>{'삭제'}</MenuItem>
        </Menu>
        {modalState.removeConfirm &&
          <PlaylistRemoveModal playlist={playlist} requestClose={this.closeRemoveConfirmModal} />}
      </DropBox>
    </li>;
  }
}

export default PlaylistListItem;