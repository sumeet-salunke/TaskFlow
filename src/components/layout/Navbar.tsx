import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="container navbar">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true">T</span>
          <span>TaskFlow</span>
        </Link>

        <div id="main-navigation" className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink to="/" end className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/tasks" className="nav-link" onClick={() => setMenuOpen(false)}>
            My Tasks
          </NavLink>
        </div>

        <Link to="/tasks/new" className="button button-primary nav-cta" onClick={() => setMenuOpen(false)}>
          + Add Task
          </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;

//NavLink automatically provides an isActive value, which lets us style the current page differently. The end prop on Home prevents / from being treated as active for every route.
