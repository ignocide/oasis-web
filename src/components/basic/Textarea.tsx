import React from 'react';
import cn from 'classnames';
import { FormLabel } from "./Form";

class Textarea extends React.Component<any, any> {
  //
  // get style() {
  //   const { prefix, suffix, style = {} } = this.props;
  //   if (suffix) {
  //     style['::after'] = {
  //       "content": suffix
  //     };
  //   }
  //   if (prefix) {
  //     style['::before'] = {
  //       "content": prefix
  //     };
  //     console.log(style)
  //   }
  //
  //   return style;
  // }

  static defaultProps = {
    rows: 3
  };

  get className() {
    const { prefix, suffix, className = null, block = false } = this.props;
    return cn('_textarea', className, { '_input-block': block, '_input-prefix': !!prefix, '_input-suffix': !!suffix });
  }

  render() {
    const { prefix, suffix, children, className, label, ...props } = this.props;
    return (
      <>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <textarea className={this.className} {...props} />
      </>
    );
  }
}


export default Textarea;