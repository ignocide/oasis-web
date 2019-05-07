import React from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearchForm from './YoutubeSearchForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<YoutubeSearchForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
