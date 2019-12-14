import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistsStore from '../../../store/woofer/playlistsStore';
import Modal, { modalController } from '../../common/Modal';
import PlaylistListItem from './PlaylistListItem';
import { IconButton } from '../../form/index';
import PlaylistCreateModal from '../PlaylistCreateModal';

import '../../../style/woofer/playlist-list.scss';
import YoutubeDownloadModal from '../YoutubeDownloadModal';

interface IProps {
  playlists: PlaylistsStore;
}


interface IState {

}

@inject('downloadStore')
@observer
class YoutubeDownloader extends React.Component<IProps, IState> {
  state = {};

  constructor(props) {
    super(props);
    modalController(this, 'downloadForm');
  }

  render() {
    const { downloadStore } = this.props;
    const { modalState } = this.state;
    return <div className='playlists'>
      <div className='playlists-header'>
        <div>
          {'Downloader'}
        </div>
        <IconButton name={'cloud_download'}  onClick={this.openDownloadFormModal}/>
      </div>
      {modalState.downloadForm && <Modal requestClose={this.closeDownloadFormModal}>
        <YoutubeDownloadModal requestClose={this.closeDownloadFormModal} />
      </Modal>}
    </div>;
  }
}

export default YoutubeDownloader;