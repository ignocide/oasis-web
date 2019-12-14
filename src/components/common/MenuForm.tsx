import React from 'react';
import '../../style/common/menu.scss';

const Menu = ({children, className = null, ...props}) => {
  return (
    <div className={`menu-container ${className ? ' ' + className : ''}`} {...props}>
      <ul>{children}</ul>
    </div>
  );
};

const MenuItem = ({children, className = null, ...props}) => {
  return (
    <li className={`menu${className ? ' ' + className : ''}`} {...props}>{children}</li>
  );
};

export { Menu, MenuItem };