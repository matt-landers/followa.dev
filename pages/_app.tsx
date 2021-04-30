import React, { useEffect } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';

import '../scss/global.scss';
import '../scss/reset.scss';

/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  // useEffect(() => {
  //   const html = document.querySelector('html');
  //   if (html) {
  //     html.setAttribute('data-theme', localStorage.getItem('theme') ?? 'dark');
  //   }
  // }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <HeadlessProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </HeadlessProvider>
  );
}
