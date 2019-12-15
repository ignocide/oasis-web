import React, { useState } from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { Menu, MenuItem } from '../common/MenuForm';
import Router from 'next/router';
import { IconButton } from '../form/index';
import AppStore from '../../store/common/appStore';
import AuthStore from '../../store/common/authStore';
import { setToken } from '../../api';
import { COOKIE_KEYS, default as cookieUtil } from '../../lib/cookies';

import '../../style/header.scss';

interface IProps {
  appStore: AppStore;
  authStore: AuthStore;
}

@inject('authStore', 'appStore')
@observer
class Header extends React.Component<IProps, any> {
  toggleSidebar = () => {
    const { appStore } = this.props;
    appStore.toggleSidebar();
  };

  render() {
    const { children = null, right = null, authStore } = this.props;
    return (
      <header id={'gnb'}>
        <div className="gnb-main">
          <div className="gnb-main-wrapper container">
            <div className="gnb-main-left">
              <IconButton name={'menu'} id={'menu-icon'} onClick={this.toggleSidebar} />
              <Link href={'/'}>{'OASIS'}</Link>
            </div>
            <div className="gnb-main-center">{children}</div>
            <div className="gnb-main-right">
              {right}
              {authStore.user ? <UserButton logout={authStore.logout} /> : <Link href={'/login'}>{'로그인'}</Link>}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const UserButton = ({ logout }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const onClickLogout = () => {
    logout();
    cookieUtil.destroy(COOKIE_KEYS.ACCESS_TOKEN);
    cookieUtil.destroy(COOKIE_KEYS.REFRESH_TOKEN);
    setToken(null);
    Router.push({
      pathname: '/',
    });
  };
  return (
    <div className={'user-menu-wrapper'}>
      <IconButton name={'fiber_manual_record'} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Menu className={'user-menu'}>
          <MenuItem onClick={onClickLogout}>{'로그아웃'}</MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Header;
