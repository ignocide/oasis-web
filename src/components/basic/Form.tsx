import React from 'react';
import cn from 'classnames';

const ButtonGroup = ({ children, className, ...props }) => {
  return <div className={cn('button-group', className)} {...props}>
    {children}
  </div>;
};

const CheckboxGroup = ({ children, align = 'column', className, ...props }) => {
  return <div className={cn('checkbox-group', `checkbox-group-${align}`, className)} {...props}>
    {children}
  </div>;
};


const RadioGroup = ({ children = null, align = 'column', className, ...props }) => {
  return <div className={cn('radio-group', `radio-group-${align}`, className)} {...props}>
    {children}
  </div>;
};


const FormLabel = ({ children, className, ...props }) => {
  return <div className={cn('label-control', className)} {...props}>
    {children}
  </div>;
};

const FormStatic = ({ children, className, sm = false, ...props }) => {
  return <div className={cn('form-static', { 'form-static-sm': sm }, className)} {...props}>
    {children}
  </div>;
};

const FormDescription = ({ children, className, ...props }) => {
  return <div className={cn('form-description', className)} {...props}>
    {children}
  </div>;
};

const InputGroup = ({ children, className, ...props }) => {
  return <div className={cn('input-group', className)} {...props}>
    {children}
  </div>;
};

export {
  FormStatic,
  ButtonGroup,
  FormLabel,
  FormDescription,
  InputGroup,
  CheckboxGroup,
  RadioGroup
};