import Header from "./layout/header";

const Layout = ({children}) => (
  <div id="main">
    <div id={'main-container'} className="container">
      <Header />
      {children}
    </div>
  </div>
);

export default Layout;