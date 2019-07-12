import React from 'react';
import cn from 'classnames';

class Radio extends React.Component<any, any> {

  get className() {
    const { className = null, block = false } = this.props;
    return cn(className, { 'radio-block': block });
  }

  render() {
    const { type,children, className, label, ...props } = this.props;
    return <div className={'radio'}>
      <label>
        <input type={'radio'} className={this.className} {...props} />
        {label}
      </label>
    </div>
  }
}


export default Radio;