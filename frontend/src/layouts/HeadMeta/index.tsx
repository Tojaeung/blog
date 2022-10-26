import Head from 'next/head';
import React from 'react';
import { IProps } from './type';

const HeadMeta = ({ title, description, image, url }: IProps) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="토재웅" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="토재웅님의 블로그" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />
    </Head>
  );
};

export default HeadMeta;
