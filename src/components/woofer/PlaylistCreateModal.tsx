import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistsStore from '../../store/woofer/playlistsStore';
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from '../basic/Modal';
import { FieldInput } from '../form/Field';
import Button from '../basic/Button';
import { Col, Row } from '../basic/Grid';
import Input from '../basic/Input';
import { FormLabel } from '../basic/Form';

interface IProps {
  playlistsStore: PlaylistsStore;
  requestClose: () => void;
}

interface IState {
  playlistCreateForm: any;
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
    const { name, value } = e.target;
    const { playlistCreateForm } = this.state;
    playlistCreateForm[name] = value;
    this.setState({
      playlistCreateForm
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    const { playlistCreateForm } = this.state;
    const { requestClose } = this.props;
    return (
      <ModalForm>
        <ModalHeader>{'플레이리스트 추가'}</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <FormLabel>{'플레이리스트 이름'}</FormLabel>
              <Input block name={'name'} value={playlistCreateForm.name || ''} onChange={this.onChangeValue} onKeyPress={this.onKeyPress}/>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button shape={'primary'} type={'submit'} onClick={this.onSubmit}>{'추가'}</Button>
          <Button shape={'text'} type={'button'} onClick={requestClose}>{'닫기'}</Button>
        </ModalFooter>
      </ModalForm>
    );
  }
}

export default PlaylistCreateModal;