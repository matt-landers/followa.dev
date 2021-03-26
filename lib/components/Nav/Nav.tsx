import Link from 'next/link';
import React from 'react';
import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a href="/">
          <span>FollowA.Dev</span>
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
