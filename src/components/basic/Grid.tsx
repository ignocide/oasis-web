import React from 'react';
import cn from 'classnames';

const Container = ({ children, className, ...props }) => {
  return <div className={`container${className ? ' ' + className : ''}`}{...props}>
    {children}
  </div>;
};

class Row extends React.Component<any, any> {

  get className() {
    const { className = null } = this.props;
    const classes = ['row'];
    if (className) {
      classes.push(className);
    }
    return classes.join(" ");
  }

  render() {
    const { children, className, ...props } = this.props;

    return <div className={this.className} {...props}>
      {children}
    </div>;
  }
}


interface IColProps {
  noGutter?: boolean,
  className?: string,
  size?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
}

class Col extends React.Component<IColProps, any> {

  get className() {
    const { className = null } = this.props;
    let { size = 12, xs, sm, md, lg,formGroup } = this.props;
    let classes = ['column'];

    lg = lg || size;
    md = md || lg;
    sm = sm || md;
    xs = xs || sm;

    if (className) {
      classes.push(className);
    }
    classes = [...classes]


    return cn('column',`col-xs-${xs}`,`col-sm-${sm}`,`col-md-${md}`,`col-lg-${lg}`,className,{'form-group':formGroup});
  }

  render() {
    const { children, className, size = 12, xs, sm, md, lg,formGroup,...props } = this.props;

    return <div className={this.className} {...props}>
      {children}
    </div>;
  }
}

export {
  Container,
  Row, Col
};