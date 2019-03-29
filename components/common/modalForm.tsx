import React, { Component } from 'react';

import '../../style/modal.scss';


interface IProps {
  children: any,
  closeModal: void,
  className?: string
}

class ModalForm extends Component<IProps, any> {

  get className() {
    const {className} = this.props;
    const classNameList = ['modal'];

    classNameList.push(className);

    return classNameList.join(' ');
  }

  render() {

    const {header, children, footer, className, ...props} = this.props;
    return <div className={'modal'}>
      <div className={'modal-header'}>
        <h1>{header}</h1>
      </div>
      <div className={'modal-body'}>

      </div>
      <div className='modal-footer'>

      </div>

    </div>;
  }
}

export default ModalForm;