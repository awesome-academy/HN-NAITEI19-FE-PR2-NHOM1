import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
