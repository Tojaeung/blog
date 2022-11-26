import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { createPost } from 'apis/post';
import { getCategories } from 'apis/category';
import { searchTagName } from 'apis/tag';

import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';

import * as S from './style';

function Post() {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState<number>(categories[0].id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();

  // 태그검색
  const [keyword, setKeyword] = useState('');
  const [searchedTags, setSearchedTags] = useState<string[]>([]);

  // 태그추가
  const [tagName, setTagName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewContainerRef.current) viewContainerRef.current.innerHTML += content;
  }, [content]);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setThumbnail(e.target.files[0]);
  };

  const handleSearchTagName = async () => {
    const tags = await searchTagName(keyword, auth.accessToken);
    setSearchedTags(tags);
  };

  const handleSubmit = async () => {
    const body = { title, content, tags };

    const formData = new FormData();
    formData.append('thumbnail', thumbnail!);
    formData.append('createReqDto', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    try {
      const newPostId = await createPost(categoryId, formData, auth.accessToken);
      alert('포스팅 되었습니다.');
      navigate(`/post/${newPostId}`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <S.Container>
      <S.Selector onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
        {categories.map((category) => (
          <S.Option value={category.id} key={category.id}>
            {category.name} {category.postCnt}개
          </S.Option>
        ))}
      </S.Selector>

      <S.TitleInput placeholder='포스팅 제목' onChange={(e) => setTitle(e.target.value)} />

      <QuillEditor content={content} setContent={setContent} />

      <S.ThumbnailInput type='file' accept='image/*' onChange={onUploadImage} />

      <S.TagSearchBox>
        <S.SearchTagInput placeholder='태그검색..' onChange={(e) => setKeyword(e.target.value)} />
        <S.SearchButton onClick={handleSearchTagName}>검색</S.SearchButton>
        {!searchedTags.length ? <p>검색된 태그가 없습니다.</p> : <p>{JSON.stringify(searchedTags)}</p>}
      </S.TagSearchBox>

      <S.TagBox>
        <S.TagInput placeholder='태그추가..' onChange={(e) => setTagName(e.target.value)} />
        <S.AddTagButton onClick={(e) => setTags([...tags, tagName])}>추가</S.AddTagButton>
        <S.InitButton onClick={(e) => setTags([])}>초기화</S.InitButton>
        {!tags.length ? <p>추가된 태그가 없습니다.</p> : <p>{JSON.stringify(tags)}</p>}
      </S.TagBox>

      <S.SubmitButton onClick={handleSubmit}>포스팅하기</S.SubmitButton>
    </S.Container>
  );
}

export default Post;
