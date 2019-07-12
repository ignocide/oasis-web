import React from 'react';
import cn from 'classnames';

class Date extends React.Component<any, any> {

  get className() {
    const { className = null, block = false } = this.props;
    return cn('_input', className, { '_input-block': block });
  }

  render() {
    const { children, className, ...props } = this.props;

    return <input className={this.className} {...props} />;
  }
}


export default Date;