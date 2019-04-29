import React from "react";
import { inject, observer } from 'mobx-react';

import PlaylistsStore from "../../store/woofer/playlistsStore";
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from "../common/ModalForm";
import { FieldInput } from "../form/Field";
import { Button } from "../form/index";
import withStore from "../hoc/withStore";

interface IProps {
  playlistsStore: PlaylistsStore,
  requestClose: () => void
}

interface IState {
  playlistCreateForm: any
}

@inject('playlistsStore')
@observer
class PlaylistCreateModal extends React.Component<IProps, IState> {
  state = {
    playlistCreateForm: {
      name: ''
    }
  };

  constructor(props) {
    super(props);
  }

  initCrateForm = () => {
    this.setState({
      playlistCreateForm: {
        name: ''
      }
    });
  };

  isValidation = () => {
    const { playlistCreateForm } = this.state;

    return !!playlistCreateForm.name;
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isValidation()) {
      return;
    }

    const { playlistCreateForm } = this.state;
    const { playlistsStore, requestClose } = this.props;

    playlistsStore.create(playlistCreateForm).then(() => {
      requestClose();
    });
  };

  onChangeValue = (e) => {
    let { name, value } = e.target;
    let { playlistCreateForm } = this.state;
    playlistCreateForm[name] = value;
    this.setState({
      playlistCreateForm
    });
  };

  render() {
    const { playlistCreateForm } = this.state;
    const { requestClose } = this.props;
    return (
      <ModalForm>
        <ModalHeader>{'플레이리스트 추가'}</ModalHeader>
        <ModalBody>
          <FieldInput name={'name'} label={'플레이리스트 이름'} value={playlistCreateForm.name || ''} onChange={this.onChangeValue} />
        </ModalBody>
        <ModalFooter>
          <Button shape={'text'} type={"submit"} onClick={this.onSubmit}>{'추가'}</Button>
          <Button shape={'text'} type={"button"} onClick={requestClose}>{'닫기'}</Button>
        </ModalFooter>
      </ModalForm>
    );
  }
}

export default PlaylistCreateModal;