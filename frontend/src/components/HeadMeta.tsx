import Head from 'next/head';

interface IProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

const HeadMeta = ({ title, description, url, image }: IProps) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title || '토재웅님의 블로그'}</title>
      <meta name="description" content={description || '토재웅님의 블로그입니다.'} />
      <meta property="og:title" content={title || '토재웅님의 블로그'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://tojaeung.com'} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="토재웅" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="토재웅님의 블로그" />
      <meta property="twitter:title" content={title || '토재웅님의 블로그'} />
      <meta property="twitter:description" content={description || '토재웅님의 블로그입니다.'} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url || 'https://tojaeung.com'} />
    </Head>
  );
};

export default HeadMeta;
