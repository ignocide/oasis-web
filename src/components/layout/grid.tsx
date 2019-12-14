import { HTMLAttributes } from 'react';
import cn from 'classnames';
interface IRowProps extends HTMLAttributes<any> {
  children?: any;
  className?: any;
}

const Row = ({ children, className, ...args }: IRowProps) => (
  <div className={cn('row', className)} {...args}>
    {children}
  </div>
);


interface IColProps {
  size?: number;
  children?: any;
  className?: any;
  layout: boolean;
}


const Col = ({ size, children, layout, className, ...args }: IColProps) => (
  <div className={cn('columns', size ? ('s' + size + ' ') : '', className, { layout: layout })} {...args}>
    {children}
  </div>
);

Col.defaultProps = {
  layout: false,
  children: null,
};

export { Row, Col };