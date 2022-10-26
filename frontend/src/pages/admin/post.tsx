import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { NextPage } from 'next';

const Editor = dynamic(() => import('components/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Index: NextPage = () => {
  // state
  const [htmlStr, setHtmlStr] = useState<string>('');

  // ref
  const viewContainerRef = useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>';
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  return (
    <>
      <EditorContainer>
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
      </EditorContainer>

      <Contents.Container>
        <Contents.HtmlContainer>
          <h2>Editor를 통해 만들어진 html 코드입니다.</h2>
          {htmlStr}
        </Contents.HtmlContainer>

        <Contents.ViewContainer ref={viewContainerRef} />
      </Contents.Container>
    </>
  );
};

export default Index;

// style
const EditorContainer = styled.div`
  width: 800px;
  height: 400px;

  margin: 0 auto;
`;

const Contents = {
  Container: styled.div`
    width: 1200px;

    margin: 0 auto;

    display: flex;
    gap: 40px;

    & > div {
      width: 600px;

      padding: 16px;

      box-sizing: border-box;

      line-break: anywhere;
    }
  `,

  HtmlContainer: styled.div`
    border: 2px solid orange;
  `,

  ViewContainer: styled.div`
    border: 2px solid olive;

    & pre {
      margin: 0;
    }

    // quill에서 코드 블럭을 사용한 경우
    .toastui-editor-ww-code-block {
      background-color: #f4f7f8;
      padding: 18px;
      margin: 2px 0 8px;
    }
  `,
};