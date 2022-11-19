import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

function PostingViewer({ content }: { content: string }) {
  return (
    <>
      <Viewer initialValue={content} plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />
    </>
  );
}

export default PostingViewer;
