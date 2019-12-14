import React from 'react';
import { CSSTransition } from 'react-transition-group';

const duration = 100;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 0},
  entered: {opacity: 1},
};

class Fade extends React.Component<any, any> {
  state = {
    inn: false
  };

  componentDidMount() {
    this.setState({
      inn: true
    });
  }

  componentWillUnmount() {
    this.setState({
      inn: false
    });
    console.log('work');
  }

  // render() {
  //   const {inn} = this.state;
  //   const {children} = this.props;
  //   return (
  //     <Transition
  //       mountOnEnter
  //       unmountOnExit
  //       timeout={duration}>
  //       {state => {
  //         console.log(state);
  //         return (
  //           <div style={{
  //             ...defaultStyle,
  //             ...transitionStyles[state]
  //           }}>
  //             {children}
  //           </div>
  //         );
  //       }}
  //     </Transition>
  //   );
  // }
  render() {
    const {inn} = this.state;
    const {children} = this.props;
    return (
      <CSSTransition in={inn} className={'example'} timeout={500}>
        <div>
          {children}
        </div>
      </CSSTransition>
    );
  }
}
export default Fade;