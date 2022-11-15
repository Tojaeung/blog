import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import * as S from './style';

function EdiorViewer({ content }: { content: string }) {
  return (
    <S.Container>
      <Viewer initialValue={content} />
    </S.Container>
  );
}

export default EdiorViewer;
