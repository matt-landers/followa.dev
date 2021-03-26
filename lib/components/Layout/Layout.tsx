import React from 'react';
import Head from 'next/head';

import styles from './Layout.module.scss';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>FollowA.Dev</title>
      </Head>
      <div className={styles.layout}>
        <Nav />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
