import { Helmet } from 'react-helmet-async';
import { removeHtmlTag } from 'utils/regex';
import { IProps } from './type';

function MetaTag({ title, desc, keywords, url }: IProps) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name='description' content={removeHtmlTag(desc.substring(0, 100))} />
      <meta name='keywords' content={keywords?.map((keyword) => keyword.tagName).toString()} />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={removeHtmlTag(desc.substring(0, 100))} />
      <meta property='og:image' content='https://tojaeung-blog-images.s3.ap-northeast-2.amazonaws.com/2021-02-27.jpg' />
      <meta property='og:url' content={url} />

      <meta property='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={removeHtmlTag(desc.substring(0, 100))} />
      <meta
        name='twitter:image'
        content='https://tojaeung-blog-images.s3.ap-northeast-2.amazonaws.com/2021-02-27.jpg'
      />

      <link rel='canonical' href={url} />
    </Helmet>
  );
}

export default MetaTag;
