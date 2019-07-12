import React from 'react';
import cn from 'classnames';

class ToggleBox extends React.Component<any, any> {

  get className() {
    const { className = null} = this.props;
    return cn(className);
  }

  render() {
    const { type,children, className, ...props } = this.props;
    return <div className={'toggle-box'}>
      <label>
        <input type={'checkbox'} className={this.className} {...props} />
      </label>
    </div>
  }
}


export default ToggleBox;