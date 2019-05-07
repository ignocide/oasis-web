import Header from "./layout/header";
import '../style/index.scss';

const Layout = ({children}) => (
  <div className="main">
    <Header />
    <div className="container">
      {children}
    </div>
  </div>
);

export default Layout;