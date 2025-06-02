import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ appName }) => {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <h1>{appName}</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li className={styles.navListItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              About
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink
              to="/person"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Employees
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Add new employee
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
