import * as S from './style';

import { IProp } from './type';

function Viewer({ content }: IProp) {
  const reg = /<[^>]*>?/g;
  const removeHtmlTag = (content: string): string => {
    return content.replace(reg, '');
  };

  return <S.Viewer>{removeHtmlTag(content)}</S.Viewer>;
}

export default Viewer;
