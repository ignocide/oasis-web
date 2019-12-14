import React from 'react';
import Icon from './Icon';
import cn from 'classnames';
import '../../style/basic/alert.scss';

const Alert = ({ type = 'info', children, ...props }) => {
  let mark = null;
  if(type === 'success'){
    mark = <Icon name={'check_circle_outline'}/>;
  }else if(type === 'danger'){
    mark = <Icon name={'error_outline'}/>;
  }
  return <div className={cn('alert', `alert-${type}`)} {...props}>
    {mark}{children}
  </div>;
};


export default Alert;