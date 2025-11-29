import Navigation from './Navigation';
import Footer from './Footer';
import useLenis from '../hooks/useLenis';

const Layout = ({ children }) => {
    useLenis();

    return (
        <div className="futuristic-app">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;