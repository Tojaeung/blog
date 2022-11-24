import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <html lang="ko" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css" />
          <script src="https://unpkg.com/react@16/umd/react.development.js" crossOrigin="true"></script>
          <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossOrigin="true"></script>
          <script src="https://unpkg.com/react-quill@1.3.3/dist/react-quill.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          <script type="text/babel" src="/my-scripts.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
