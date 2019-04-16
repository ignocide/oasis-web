import React from 'react';

import '../../style/modal.scss';

export const ModalForm = ({ children, ...props }) => {
  return <div className={'modal'} {...props}>
    {children}
  </div>;
};

export const ModalHeader = ({ children, right = null, ...props }) => {
  return <div className={'modal-header'} {...props}>
    {children}{right}
  </div>;
};

export const ModalBody = ({ children, ...props }) => {
  return <div className={'modal-body'} {...props}>
    {children}
  </div>;
};

export const ModalFooter = ({ children, ...props }) => {
  return <div className={'modal-footer'} {...props}>
    {children}
  </div>;
};