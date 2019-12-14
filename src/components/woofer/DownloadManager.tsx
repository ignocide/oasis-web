import React from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

import '../../style/woofer/download-manager.scss';
import DownloadStore from '../../store/woofer/downloadStore';
import { IconButton } from '../form/index';

interface IProps {
  downloadStore?: DownloadStore;
}

@inject('downloadStore')
@observer
class DownloadManager extends React.Component<IProps, any> {
  state = {
    isOpen: false
  };

  constructor(props, context) {
    super(props, context);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { downloadInfos } = this.props.downloadStore;
    const videoIds = Object.keys(downloadInfos);
    const { isOpen } = this.state;
    if(videoIds.length === 0){
      return null;
    }
    return <div className={cn('download-manager', { open: isOpen })}>
      <div className={'download-manager-header'}>
        {'Downloading...'}
        <IconButton name={isOpen ? 'expand_more' : 'expand_less'} onClick={this.toggle}/>
      </div>
      <div className={'download-manager-body'}>
        {
          videoIds.map((videoId) => {
            const {video,progress }= downloadInfos[videoId];
            return <div className={cn('download-item',{'download-done': progress === 100})} key={video.videoId}>
              {video.title}
              <span className={'download-percentage'}>{`${progress}%`}</span>
              <div className={'download-progress-background'} style={{width: `${progress}%`}}/>
            </div>;
          })
        }
      </div>
    </div>;
  }
}

export default DownloadManager;