import React from 'react';

import { inject, observer } from 'mobx-react';
import { IconButton } from '../form/index';

const Sidebar = ({ className = '', appStore, children, ...props }) => {
  const { sidebar: isOpen, toggleSidebar } = appStore;

  return (
    <aside id={'sidebar'} className={`${isOpen ? 'open' : 'close'} ${className}`} {...props}>
      {children}
    </aside>
  );
};

export default inject('appStore')(observer(Sidebar));