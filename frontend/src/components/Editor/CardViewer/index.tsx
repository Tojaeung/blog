import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import * as S from './style';

function CardViewer({ content }: { content: string }) {
  const reg = /<[^>]*>?/g;
  const removeHtmlTag = (content: string): string => {
    return content.replace(reg, '');
  };

  return (
    <S.Container>
      <Viewer initialValue={removeHtmlTag(content) || ''} />
    </S.Container>
  );
}

export default CardViewer;
