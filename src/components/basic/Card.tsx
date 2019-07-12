import React from 'react';
import cn from 'classnames';

const Card = ({ children, className = null, ...props }) => {
  return <div className={cn('card', className)} {...props}>
    {children}
  </div>;
};

const CardHeader = ({ children, className = null, ...props }) => {
  return <div className={cn('card-header', className)} {...props}>
    {children}
  </div>;
};

const CardBody = ({ children, className = null, ...props }) => {
  return <div className={cn('card-body', className)} {...props}>
    {children}
  </div>;
};

const CardFooter = ({ children, className = null, ...props }) => {
  return <div className={cn('card-footer', className)} {...props}>
    {children}
  </div>;
};


export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
};