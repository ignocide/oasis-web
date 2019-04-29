import React from 'react';
import Link from "next/link";
import { inject, observer } from "mobx-react";

import '../style/header.scss';

@inject('auth')
@observer
class Header extends React.Component<any, any> {

  render() {
    const { children = null, auth = null } = this.props;
    return (
      <header id={'gnb'}>
        <div className="gnb-main">
          <div className="gnb-main-wrapper container">
            <div className="gnb-main-left">
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