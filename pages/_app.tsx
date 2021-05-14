import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';

import '../scss/global.scss';
import '../scss/reset.scss';
import { useApolloClient } from '@apollo/client';
import { setApolloClient } from 'lib/state/profile/services';
import { addAuthHeader } from 'lib/utils/apollo';

/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  const ServiceProvider: React.FC = ({ children }) => {
    const client = useApolloClient();
    if (client) {
      addAuthHeader(client);
      setApolloClient(client);
    } else {
      return <></>;
    }
    return <>{children}</>;
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <HeadlessProvider pageProps={pageProps}>
      <ServiceProvider>
        <Component {...pageProps} />
      </ServiceProvider>
    </HeadlessProvider>
  );
}
