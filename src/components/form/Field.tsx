import React from 'react';

const FieldInput = ({className = null, name, label, autoComplete = 'off', ...props}) => {
  return <div className={["form-field", className].join(" ")}>
    {label && <label className={'form-label'} htmlFor={name}>{label}</label>}
    <input className={'input'} name={name} {...props} autoComplete={autoComplete} />
    <div className={'input-underline'} />
  </div>;
};
const FieldTextArea = ({className = null, name, label, rows = 3, ...props}) => {
  return <div className={["form-field", className].join(" ")}>
    {label && <label className={'form-label'} htmlFor={name}>{label}</label>}
    <textarea className={'textarea'} name={name} {...props} rows={rows} />
    <div className={'input-underline'} />
  </div>;
};

const ButtonGroup = ({children, ...props}) => {
  return <div className={"button-group"} {...props}>
    {children}
  </div>;
};
export { FieldInput, FieldTextArea, ButtonGroup };