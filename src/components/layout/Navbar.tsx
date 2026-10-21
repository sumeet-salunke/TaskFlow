import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar-container">
        <Link to="/" className="brand">
        <span className="brand-icon">
          T</span>
          <span>TaskFlow</span>
          </Link>
          <div className="nav-links">
            <NavLink to="/" end className={({isActive}) => isActive?'nav-link active': 'nav-link'} >
            Home</NavLink>

            <NavLink
            to="/tasks"
            className={({isActive})=>
            isActive?'nav-link active':'nav-link'}
            >
            My Tasks
            </NavLink>
          </div>
          <Link to="/tasks/new" className="button button-primary nav-cta" >
          +Add Task
          </Link>
      </nav>
    </header>
  );
}

export default Navbar;

//NavLink automatically provides an isActive value, which lets us style the current page differently. The end prop on Home prevents / from being treated as active for every route.