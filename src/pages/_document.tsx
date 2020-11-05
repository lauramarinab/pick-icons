import React from "react";
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import { globalStyles } from "../globalStyles";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:wght@200;400;700&display=swap"
            rel="stylesheet"
          />
          <title>Pick Icons</title>
        </Head>
        <body>
          {globalStyles}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
