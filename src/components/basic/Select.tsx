import React from 'react';
import cn from 'classnames';

class Select extends React.Component<any, any> {

  get className() {
    const { className = null, block = false } = this.props;
    return cn('_select', className, { 'btn-block': block });
  }

  render() {
    const {  className, options = [], ...props } = this.props;

    return <select className={this.className} {...props} >
      {options.map(({ value, label }) => {
        return <option key={value} value={value}>{label}</option>;
      })}
    </select>;
  }
}


export default Select;