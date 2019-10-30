import { HTMLAttributes } from 'react';

interface IRowProps extends HTMLAttributes<any> {
  children?: any
  className?: any
}

const Row = ({ children, className, ...args }: IRowProps) => (
  <div className={`row ${className ? className : ""}`} {...args}>
    {children}
  </div>
);


interface IColProps {
  size?: number
  children?: any
  className?: any
}


const Col = ({ size, children, layout, className, ...args }: IColProps) => (
  <div className={`${size ? ("s" + size + " ") : ""}columns${className ? ' ' + className : ""}${layout ? ' layout' : ''}`} {...args}>
    {children}
  </div>
);

Col.defaultProps = {
  layout: false,
  children: null,
};

export { Row, Col };