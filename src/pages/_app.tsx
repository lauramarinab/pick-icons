import React from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Pick Icons</title>
        <meta property="og:title" content="Pick Icons" key="title" />
      </Head>
      <DefaultSeo
        openGraph={{
          title: "Pick Icons",
          description: "Beautiful hand-crafted SVG icons - download and copy SVG",
          type: "website",
          url: "https://pick-icons.vercel.app/",
          locale: "en_IE",
          site_name: "Pick Icons",
          images: [
            {
              url:
                "https://user-images.githubusercontent.com/38502071/98811081-87c01d00-2420-11eb-8fb4-a079e6de0cde.jpg",
              width: 800,
              height: 600,
              alt: "Pick Icons - Beautiful hand-crafted SVG icons - download and copy SVG",
            },
          ],
        }}
      />

      <Component {...pageProps} />
    </>
  );
};

export default App;
