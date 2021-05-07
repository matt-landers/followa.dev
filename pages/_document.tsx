import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.querySelector('html').setAttribute('data-theme', (typeof localStorage !== 'undefined' && localStorage?.getItem('theme') === 'LIGHT') ? 'light' : 'dark')`,
            }}></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
