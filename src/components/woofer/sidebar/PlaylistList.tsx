import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistsStore from '../../../store/woofer/playlistsStore';
import Modal, { modalController } from '../../common/Modal';
import PlaylistListItem from './PlaylistListItem';
import { IconButton } from '../../form/index';
import PlaylistCreateModal from '../PlaylistCreateModal';

import '../../../style/woofer/playlist-list.scss';

interface IProps {
  playlists: PlaylistsStore
}


interface IState {

}

@inject('playlistsStore')
@observer
class PlaylistList extends React.Component<IProps, IState> {
  state = {};

  constructor(props) {
    super(props);
    modalController(this, 'createForm');
  }

  render() {
    const { playlistsStore } = this.props;
    const { modalState } = this.state;
    const { playlists } = playlistsStore;
    return <div className='playlists'>
      <div className='playlists-header'>
        {'플레이리스'}<IconButton className={'playlist-add-btn'} name={'add'} onClick={this.openCreateFormModal} />
      </div>
      {playlists.map((playlist) => <PlaylistListItem playlist={playlist} key={playlist.id} />)}
      {modalState.createForm && <Modal requestClose={this.closeCreateFormModal}>
        <PlaylistCreateModal requestClose={this.closeCreateFormModal} />
      </Modal>}
    </div>;
  }
}

export default PlaylistList;