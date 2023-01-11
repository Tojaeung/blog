import * as S from './style';
import { IProp } from './type';

import { removeHtmlTag } from 'utils/regex';

function Viewer({ content }: IProp) {
  return <S.Viewer>{removeHtmlTag(content)}</S.Viewer>;
}

export default Viewer;
