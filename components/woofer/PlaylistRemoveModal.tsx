import React from "react";
import { inject, observer } from 'mobx-react';

import PlaylistsStore from "../../store/playlistsStore";
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from "../common/ModalForm";
import { Button } from "../form/index";
import Playlist from "../../vo/woofer/playlist";
import Modal from "../common/Modal";

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
            <Button shape={'text'} className={'red'} onClick={this.onSubmit}>{'삭제'}</Button>
            <Button shape={'text'} onClick={requestClose}>{'닫기'}</Button>
          </ModalFooter>
        </ModalForm>
      </Modal>
    );
  }
}

export default PlaylistRemoveModal;