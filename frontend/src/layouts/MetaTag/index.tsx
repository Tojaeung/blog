import { Helmet } from 'react-helmet-async';
import { IProps } from './type';

function MetaTag({ title, desc, keywords, image, url }: IProps) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name='description' content={desc.substring(0, 100)} />
      <meta name='keywords' content={keywords?.map((keyword) => keyword.tagName).toString()} />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={desc.substring(0, 100)} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />

      <meta property='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={desc.substring(0, 100)} />
      <meta name='twitter:image' content={image} />

      <link rel='canonical' href={url} />
    </Helmet>
  );
}

export default MetaTag;
