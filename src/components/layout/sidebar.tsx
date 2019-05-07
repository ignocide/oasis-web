import React from 'react';
import { inject, observer } from "mobx-react";

const Sidebar = ({ className = '', appStore, children, ...props }) => {
  const { sidebar: isOpen } = appStore;


  return (
    <aside id={"sidebar"} className={`${isOpen ? 'open' : 'close'} ${className}`} {...props}>
      {children}
    </aside>
  );
};

export default inject('appStore')(observer(Sidebar));