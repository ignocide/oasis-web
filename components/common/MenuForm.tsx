import React from 'react';

const Menu = ({children, className, ...props}) => {
  return (
    <div className={`menu-container menu-container-open${className ? " " + className : ''}`} {...props}>
      <ul>{children}</ul>
    </div>
  );
};

const MenuItem = ({children, className, ...props}) => {
  return (
    <li className={`menu${className ? " " + className : ''}`} {...props}>{children}</li>
  );
};

export { Menu, MenuItem };