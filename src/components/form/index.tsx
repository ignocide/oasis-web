import React from 'react';
import Icon from '../basic/Icon';
import cn from 'classnames';
const Button = ({ className = '', shape = '', color = '', type = 'text', children = null, ...props }) => {

  const classNameList = ['button'];

  if (className) {
    classNameList.push(className);
  }
  if (shape) {
    classNameList.push(`btn-${shape}`);
  }
  if (color) {
    classNameList.push(`btn-${color}`);
  }
  return <button className={classNameList.join(' ')} type={type} {...props}>{children}</button>;
};
//
// const IconButton = ({ className = '', type = 'text', shape = '', color = '', name, children = null, ...props }) => {
//   const classNameList = ['button btn-icon'];
//
//   if (className) {
//     classNameList.push(className);
//   }
//   if (shape) {
//     classNameList.push(`btn-${shape}`);
//   }
//   if (color) {
//     classNameList.push(`btn-${color}`);
//   }
//   return <button className={classNameList.join(" ")} type={type} {...props}><Icon name={name} /></button>;
// };

class IconButton extends React.Component<any, any> {

  get className (){
    const { className, shape = 'default' } = this.props;

    return cn('button btn-icon',className,`btn-${shape}`);
  }
  render() {

    const { className = '', type = 'text', shape = 'default', name, children = null, ...props } = this.props;

    return <button className={this.className} type={type} {...props}><Icon name={name} size={'xs'}/></button>;
  }

}

export { Button, IconButton };