import Header from "./layout/header";
import '../style/index.scss';

const Layout = ({children}) => (
  <div className="main">
    <div className="container">
      <Header />
      {children}
    </div>
  </div>
);

export default Layout;