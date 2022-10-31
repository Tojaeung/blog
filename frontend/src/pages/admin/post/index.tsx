import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import { Container, EditorBox, TitleInput, ThumbnailInput, SubmitButton } from './style';

const Editor = dynamic(() => import('components/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Index: NextPage = () => {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File>();

  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewContainerRef.current) viewContainerRef.current.innerHTML += desc;
  }, [desc]);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('thumbnail', thumbnail!);
  };

  return (
    <Container>
      <TitleInput placeholder="포스팅 제목" onChange={(e) => setTitle(e.target.value)} />
      <EditorBox>
        <Editor htmlStr={desc} setHtmlStr={setDesc} />
      </EditorBox>
      <ThumbnailInput type="file" accept="image/*" onChange={onUploadImage} />
      <SubmitButton onClick={handleSubmit}>포스팅하기</SubmitButton>
    </Container>
  );
};

// 인증안된 사용자 못오게 막음

export default Index;
