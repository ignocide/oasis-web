// this component is seperated with main react root component
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ModalConsumer } from '../context/Modal';
import '../../style/modal.scss';


interface IProps {
  children: string;
  duration?: number;
  onTimeToDestroy?: Function;
}

interface IState {
  leftDuration: number;
}

class Toastr extends React.Component<IProps, any> {

  static defaultProps = {
    onTimeToDestroy: function () {
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      leftDuration: props.duration
    }
  }

  componentDidMount() {
    let intervalId = setInterval(() => {
      const { leftDuration } = this.state;
      let updatedDuration = leftDuration - 50;
      if (updatedDuration <= 0) {
        updatedDuration = 0;
        this.props.onTimeToDestroy();
        clearInterval(intervalId);
      }
      this.setState({
        leftDuration: updatedDuration
      }, () => {
        this.forceUpdate();
      })
    }, 50)
  }

  componentWillUnmount() {
  }
  render() {
    const { children, duration } = this.props;
    const { leftDuration } = this.state;
    const persentage = leftDuration / duration
    return <div className={'toastr-node'}>
      <div className={'toastr-node-timebar'} style={{
        transform: `scaleX(${persentage})`
      }} />
      {children}
    </div>
  }
}

const destroy = function (container) {
  if (!container) {
    return;
  }
  ReactDOM.unmountComponentAtNode(container);
  const toastrContainer = document.getElementById('toastr-container');
  toastrContainer.removeChild(container);
  container.remove();
}

const renderer = function ({ message, ...props }) {
  const toastrContainer = document.getElementById('toastr-container');
  const messageElement = document.createElement('div');
  toastrContainer.appendChild(messageElement);
  ReactDOM.render(<Toastr {...props} onTimeToDestroy={() => {
    destroy(messageElement)
  }}>
    {message}
  </Toastr>
    , messageElement)
}

export { renderer }

export default Toastr;