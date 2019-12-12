import React from "react";
import { inject, observer } from 'mobx-react';

import PlaylistsStore from "../../store/woofer/PlaylistsStore";
import Playlist from "../../dto/woofer/playlist";
import Modal, { ModalBody, ModalFooter, ModalForm, ModalHeader } from "../basic/Modal";
import Button from "../basic/Button";

interface IProps {
  playlistsStore: PlaylistsStore,
  playlist: Playlist,
  requestClose: () => void
}

interface IState {
  playlistCreateForm: any
}

@inject('playlistsStore')
@observer
class PlaylistRemoveModal extends React.Component<IProps, IState> {
  state = {};

  constructor(props) {
    super(props);
  }

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { playlist } = this.props;

    const { playlistsStore, requestClose } = this.props;

    playlistsStore.remove(playlist.id).then(() => {
      requestClose();
    });
  };


  render() {
    const { playlistCreateForm } = this.state;
    const { requestClose, playlist } = this.props;
    return (
      <Modal requestClose={requestClose}>
        <ModalForm>
          <ModalHeader>{'삭제 확인'}</ModalHeader>
          <ModalBody>{`${playlist.name}을(를) 삭제 하시겠습니까?`}</ModalBody>
          <ModalFooter>
            <Button shape={'danger'} className={'red'} onClick={this.onSubmit}>{'삭제'}</Button>
            <Button onClick={requestClose}>{'닫기'}</Button>
          </ModalFooter>
        </ModalForm>
      </Modal>
    );
  }
}

export default PlaylistRemoveModal;