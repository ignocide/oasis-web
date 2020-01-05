import React from 'react';
import cn from 'classnames';

const Container = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('container', className)} {...props}>
      {children}
    </div>
  );
};

class Row extends React.Component<any, any> {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <div className={cn('row', className)} {...props}>
        {children}
      </div>
    );
  }
}

interface IColProps {
  noGutter?: boolean;
  className?: string;
  formGroup?: boolean;
  size?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

class Col extends React.Component<IColProps, any> {
  get className() {
    const { className = null } = this.props;
    let { size = 12, xs, sm, md, lg, formGroup, noGutter } = this.props;

    lg = lg || size;
    md = md || lg;
    sm = sm || md;
    xs = xs || sm;

    return cn(
      'column',
      `col-xs-${xs}`,
      `col-sm-${sm}`,
      `col-md-${md}`,
      `col-lg-${lg}`,
      className,
      { 'form-group': formGroup },
      { 'no-gutter': noGutter }
    );
  }

  render() {
    const {
      children,
      className,
      size = 12,
      xs,
      sm,
      md,
      lg,
      formGroup,
      noGutter,
      ...props
    } = this.props;

    return (
      <div className={this.className} {...props}>
        {children}
      </div>
    );
  }
}

export { Container, Row, Col };
