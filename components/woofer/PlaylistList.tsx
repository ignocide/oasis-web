import React from 'react';
import { inject, observer } from 'mobx-react';
import PlaylistsStore from "../../store/playlistsStore";

import '../../style/woofer/playlist-list.scss';
import Modal, { modalController } from "../common/Modal";
import PlaylistListItem from "./PlaylistListItem";
import { IconButton } from "../form/index";
import PlaylistCreateModal from "./PlaylistCreateModal";

interface IProps {
  playlists: PlaylistsStore
}


interface IState {

}

@inject('playlistsStore')
@observer
class Playlists extends React.Component<IProps, IState> {
  state = {};

  constructor(props){
    super(props)
    modalController(this,'createForm')
  }
  render() {
    const { playlistsStore: playlistsStore } = this.props;
    const { modalState} = this.state;
    const { playlists } = playlistsStore;
    return <div className="playlists">
      <div className="playlists-header">
        {'프로젝트'}<IconButton className={'playlist-add-btn'} name={'add'} onClick={this.openCreateFormModal}/>
      </div>
        {playlists.map((playlist) => <PlaylistListItem playlist={playlist}/>)}
      {modalState.createForm && <Modal requestClose={this.closeCreateFormModal}>
        <PlaylistCreateModal requestClose={this.closeCreateFormModal}/>
      </Modal>}
    </div>;
  }
}

export default Playlists;