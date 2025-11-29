import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="futuristic-app">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;