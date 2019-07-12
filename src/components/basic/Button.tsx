import React from 'react';

class Button extends React.Component<any, any> {

  get className() {
    const { className = null,shape='default',block=false,lg=false} = this.props;
    const classes = ['btn',`btn-${shape}`];
    if (className) {
      classes.push(className);
    }
    if(block){
      classes.push('btn-block')
    }
    if(lg){
      classes.push('btn-lg')
    }
    return classes.join(" ");
  }

  render() {
    const { children, className, ...props } = this.props;

    return <button className={this.className} {...props}>
      {children}
    </button>;
  }
}


export default Button