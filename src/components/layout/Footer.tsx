import { Link
 } from "react-router-dom";

 function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <Link to="/" className="brand footer-brand">
        <span className="brand-icon">T</span>
        <span>TaskFlow</span>
        </Link>
        <p>Make progress, one task at a time.</p>

        <span className="copyright">
           © {new Date().getFullYear()} TaskFlow
        </span>
      </div>

    </footer>
  );
 }

 export default Footer;