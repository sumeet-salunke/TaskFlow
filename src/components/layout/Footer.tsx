import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <Link to="/" className="brand footer-brand">
          <span className="brand-icon" aria-hidden="true">T</span>
          <span>TaskFlow</span>
        </Link>
        <p>Make progress, one task at a time.</p>
        <span className="copyright">Copyright {CURRENT_YEAR} TaskFlow</span>
      </div>
    </footer>
  );
}

export default Footer;
