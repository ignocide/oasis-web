import React from 'react';
import ReactDOM from 'react-dom';
import SearchedYoutubeVideoList from './SearchedYoutubeVideoList';

describe('SearchedYoutubeVideoList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchedYoutubeVideoList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});