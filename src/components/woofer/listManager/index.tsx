import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row } from "../../basic/Grid";


interface IProps {

}

interface IState {
  currentTab: null
}

@inject('playlistStore')
@observer
class WooferPlaylistManager extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
  }

  render() {
    const tabs = {
      playlist: "재생목록",
      youtubeSearchResults: '검색결과'
    };
    return <div>
      <div>
        <ul>
          <li>{'재생목록'}</li>
          <li>{'검색결과'}</li>
        </ul>
        <div>

        </div>
      </div>
    </div>;
  }

}


export default WooferPlaylistManager;