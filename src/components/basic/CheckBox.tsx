import React from 'react';
import cn from 'classnames';

class Checkbox extends React.Component<any, any> {

  get className() {
    const { className = null, block = false } = this.props;
    return cn(className, { 'btn-block': block });
  }

  render() {
    const { type,children, className, label, ...props } = this.props;
    return <div className={'checkbox'}>
      <label>
        <input type={'checkbox'} className={this.className} {...props} />
        {label}
      </label>
    </div>;
  }
}


export default Checkbox;