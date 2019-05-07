import React from 'react';
import Link from "next/link";
import { inject, observer } from "mobx-react";

import { IconButton } from "../form/index";
import AppStore from "../../store/common/appStore";

import '../../style/header.scss';

interface IProps {
  appStore: AppStore
}

@inject('auth', 'appStore')
@observer
class Header extends React.Component<IProps, any> {

  toggleSidebar = () => {
    const { appStore } = this.props;
    appStore.toggleSidebar()
  };

  render() {
    const { children = null, auth = null } = this.props;
    return (
      <header id={'gnb'}>
        <div className="gnb-main">
          <div className="gnb-main-wrapper container">
            <div className="gnb-main-left">
              <IconButton name={'menu'} id={'menu-icon'} onClick={this.toggleSidebar}/>
              <Link href={'/'}>{"OASIS"}</Link>
            </div>
            <div className="gnb-main-center">
              {children}
            </div>
            <div className="gnb-main-right">
              {!auth.user && <Link href={'/'}>{"로그인"}</Link>}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;