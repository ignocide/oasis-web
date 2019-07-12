import React, { useEffect, useState } from 'react';
import Icon from './Icon';


// [
//   {
//     name : 'Dropdown header 1'
//     options: [
//
//     ]
//   }
// ]

interface IProps {
  onSelect: Function,
  placeholder: string,
  value: string,
}

interface IState {
  isOpenOptions: boolean,
  value: null,
}

class Dropdown extends React.Component<IProps, IState> {
  static defaultProps = {
    onChange: function () {

    }
  };

  state = {
    isOpenOptions: false
  };

  get containerClassName() {
    return 'dropdown';
  }

  get value() {
    const { placeholder, value } = this.props;
    const label = this.getLabelByValue(value);
    return label || placeholder;
  }


  getLabelByValue = (value) => {
    const { options } = this.props;

    const searchedOption = options.find((option) => {
      return value === option.value;
    }) || null;

    const label = searchedOption ? searchedOption.label : null;

    return label;

  };

  distinguishOptionType = () => {
    const { options = [] } = this.props;

    if (options[0] && options) {

    }

  };

  toggleOptions = () => {
    const { isOpenOptions } = this.state;
    this.setState({
      isOpenOptions: !isOpenOptions
    });
  };

  onSelect = (value) => {
    const { onChange } = this.props;
    this.setState({
      isOpenOptions: false
    }, () => onChange(value));
  };

  render() {
    const { onChange, value, children, className, placeholder, options = [], ...props } = this.props;
    const { isOpenOptions } = this.state;
    return <div className={this.containerClassName}>
      <button className={'btn btn-default'} {...props} onClick={this.toggleOptions}>
        {this.value}
        <Icon className={'dropbox-arrow icon-xs'} name={'expand_more'} />
      </button>
      {isOpenOptions ? <DropboxMenuList options={options} onSelect={this.onSelect} /> : null}
    </div>;
  }
}


// const DropboxMenuList = () => {
//   useEffect(() => {
//
//   })
//   return <div className={'dropbox-menu-list'}>
//   </div>
// }
class DropboxMenuList extends React.Component<any, any> {

  get options() {
    const { options } = this.props;

    return options;
  }

  render() {
    const { onSelect } = this.props;
    return <ul className={'dropbox-menu-list'}>
      {this.options.map(({ value, label }, index) => {
        return <DropboxMenuItem key={`${index}_${value}`} label={label} onClick={() => onSelect(value)} />;
      })}
    </ul>;
  }
}

const DropboxMenuItem = ({ label, ...props }) => {
  return <div className={'dropbox-menu-item'} {...props}>
    {label}
  </div>;

};

const DropboxMenuHeader = () => {
  return <div className={'dropbox-menu-header'}>

  </div>;
};

export default Dropdown;