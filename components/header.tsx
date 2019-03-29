import Link from "next/link";
import '../style/header.scss';


const Header = ({sub = null}) => (
  <header id={'gnb'}>
    <div className="gnb-main">
      <div className="gnb-main-wrapper container">
        <div className="gnb-main-left">
          <Link href={'/'}>{"OASIS"}</Link>
        </div>
        <div className="gnb-main-center">

        </div>
        <div className="gnb-main-right">
          <Link href={'/'}>{"로그인"}</Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;