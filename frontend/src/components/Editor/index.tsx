import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { IEditor } from './type';

import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

const Editor: NextPage<IEditor> = ({ htmlStr, setHtmlStr }) => {
  const editorRef = useRef<ToastEditor>(null);

  // Editor Change 이벤트
  const onChangeEditor = () => {
    if (editorRef.current) {
      setHtmlStr(editorRef.current.getInstance().getHTML());
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      // 전달받은 html값으로 초기화
      editorRef.current.getInstance().setHTML(htmlStr);

      // 기존 이미지 업로드 기능 제거
      editorRef.current.getInstance().removeHook('addImageBlobHook');
      // 이미지 서버로 데이터를 전달하는 기능 추가
      editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
        (async () => {
          const formData = new FormData();
          formData.append('file', blob);

          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post/upload`, formData, {
            withCredentials: true,
          });

          callback(res.data.imageUrl, '이미지 파일');
        })();

        return false;
      });
    }
  }, []);

  // Editor에 사용되는 plugin 추가
  const plugins = [
    colorSyntax, // 글자 색상 추가
    codeSyntaxHighlight, // 코드 하이라이팅
    tableMergedCell, // 테이블 셀 합치는거
  ];

  return (
    <ToastEditor
      initialValue=""
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editorRef}
      height="500px"
      plugins={plugins}
      onChange={onChangeEditor}
    />
  );
};

export default Editor;
