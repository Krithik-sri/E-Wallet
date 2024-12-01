import React from 'react';
import styles from "./Header.module.scss";
import { Link, NavLink } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import {FaTimes} from 'react-icons/fa';
import { useState } from 'react';

export const Logo = (
  <div className={styles.logo}>
      <Link to="/">
        <h2>
          KS<span>mart</span>
        </h2>
      </Link>
    </div>
)

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);


  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p id="count">0</p>
      </Link>
    </span>
  )

  return <header>
  <div className={styles.header}>
    {Logo}
    <nav className={showMenu ? `${styles["show-nav"]}`: `${styles["hide-nav"]}`}>
      <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`: `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>

      <ul>
        <li className={styles["logo-mobile"]}>
          {Logo}
          <FaTimes size={22} color="#fff" onClick={hideMenu}></FaTimes>
        </li>
        <li>
          <NavLink to="/shop" className={activeLink}>Shop</NavLink>
        </li>
      </ul>
      <div className={styles["header-right"]}>
        <span className={styles.links}>
          <Link to={"login"} className={activeLink}>
            Login
          </Link>
          <Link to={"register"} className={activeLink}>
            Register
          </Link>
          <Link to={"order-history"} className={activeLink}>
            My order
          </Link>
        </span>
        {cart}
      </div>
    </nav>
    <div className={styles["menu-icons"]}>
      {cart}
      <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
    </div>
  </div>
</header>
}

export default Header