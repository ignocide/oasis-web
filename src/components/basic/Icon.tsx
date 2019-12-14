import React from 'react';
import cn from 'classnames';
import '../../style/basic/icon.scss';

const Icon = ({ className = '',size='sm', name, ...props }) => {
  return <i className={cn('icon material-icons',`icon-${size}`,className)} {...props}>{name}</i>;
};

export default Icon;