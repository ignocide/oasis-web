import React from 'react';

interface IState {
  shown: boolean,
  size: {
    width: number,
    height: number
  }
}

class Persistentor extends React.Component<any, IState> {

  container: any = React.createRef();

  state = {
    shown: true,
    size: {

    }
  };

  constructor(props) {
    super(props);

  }

  onScroll = (e) => {
    const { shown } = this.state;
    const { visible, size } = this.isVisible();
    if (shown !== visible) {
      this.setState({
        shown: visible,
        size: size
      });
    }
  };

  isVisible = () => {
    const { current: element } = this.container;
    const rect = element.getBoundingClientRect();
    const { top, height, width } = rect;

    return {
      visible: !(height + top < 0),
      size: {
        height, width
      }
    };
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    // window.addEventListener('resize',this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    // window.removeEventListener('resize',this.onScroll)
  }

  get containerClassName() {
    const { shown } = this.state;

    return shown ? '' : 'flow-corner'
  }

  get containerStyle() {
    const { shown, size } = this.state;
    if (shown) {
      return {};
    }
    else {
      return {
        display: 'inline-block',
        ...size
      };
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <div ref={this.container} style={this.containerStyle}>
        <div className={this.containerClassName}>
          <div className={className}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Persistentor;