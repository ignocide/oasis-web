import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistsStore from '../../store/woofer/playlistsStore';
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from '../basic/Modal';
import { FieldInput } from '../form/Field';
import Button from '../basic/Button';
import { Col, Row } from '../basic/Grid';
import Input from '../basic/Input';
import { FormLabel } from '../basic/Form';
import DownloadStore from '../../store/woofer/downloadStore';
import youtubeUtil from '../../utils/youtube';

interface IProps {
  downloadStore: DownloadStore;
  requestClose: () => void;
}

interface IState {
  youtubeDownloadForm: any;
}

@inject('downloadStore')
@observer
class YoutubeDownloadModal extends React.Component<IProps, IState> {
  state = {
    youtubeDownloadForm: {
      youtubeSource: ''
    }
  };

  constructor(props) {
    super(props);
  }

  initCrateForm = () => {
    this.setState({
      youtubeDownloadForm: {
        youtubeSource: ''
      }
    });
  };

  isValidation = () => {
    const { youtubeDownloadForm } = this.state;

    return !!youtubeDownloadForm.youtubeSource;
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isValidation()) {
      return;
    }

    const { youtubeDownloadForm } = this.state;
    const { downloadStore, requestClose } = this.props;
    const {youtubeSource} = youtubeDownloadForm;

    const videoId = youtubeUtil.getVideoIdFromUrl(youtubeSource);
    // const matches = pattern.exec(youtubeSource)
    // let videoId = null;
    // if(matches && matches[6]){
    //   videoId = matches[6];
    // } else {
    //   videoId = youtubeSource;
    // }
    downloadStore.downloadVideoAsMp3({
      videoId
    });
  };

  onChangeValue = (e) => {
    const { name, value } = e.target;
    const { youtubeDownloadForm } = this.state;
    youtubeDownloadForm[name] = value;
    this.setState({
      youtubeDownloadForm
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    const { youtubeDownloadForm } = this.state;
    const { requestClose } = this.props;
    return (
      <ModalForm>
        <ModalHeader>{'Youtube 다운로드'}</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <FormLabel>{'Youtube Play Id or Youtube Url'}</FormLabel>
              <Input block name={'youtubeSource'} value={youtubeDownloadForm.youtubeSource || ''} onChange={this.onChangeValue} onKeyPress={this.onKeyPress}/>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button shape={'primary'} type={'submit'} onClick={this.onSubmit}>{'다운로드'}</Button>
          <Button shape={'text'} type={'button'} onClick={requestClose}>{'닫기'}</Button>
        </ModalFooter>
      </ModalForm>
    );
  }
}

export default YoutubeDownloadModal;