import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';

import { searchTagName } from 'apis/tag';
import { getCategories } from 'apis/category';
import { addPost } from 'apis/post';

import QuillEditor from 'components/QuillEditor';

import * as S from './style';

function Post() {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();

  // 태그검색
  const [keyword, setKeyword] = useState('');
  const [searchedTags, setSearchedTags] = useState<string[]>([]);

  // 태그추가
  const [tagName, setTagName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const { data: categories } = useQuery(['categories'], () => getCategories());

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setThumbnail(e.target.files[0]);
  };

  const handleSearchTagName = async () => {
    const tags = await searchTagName(keyword);
    setSearchedTags(tags);
  };

  const handleSubmit = async () => {
    const confirm = prompt('정말로 포스팅 하시겠습니까?("포스팅" 입력시, 실행된다.)', '');
    if (confirm === '포스팅') {
      const body = { title, content, tags };

      const formData = new FormData();
      formData.append('thumbnail', thumbnail as File);
      formData.append('createReqDto', new Blob([JSON.stringify(body)], { type: 'application/json' }));

      try {
        if (typeof categoryId === 'undefined') return alert('카테고리를 선택해주세요 !!');

        const newPostId = await addPost(categoryId, formData);
        alert('포스팅 되었습니다.');
        navigate(`/post/${newPostId}`);
      } catch (e: any) {
        alert(e.response.data.message);
      }
    } else alert('포스팅 되지 않았습니다.');
  };

  return (
    <>
      <Helmet>
        <title>포스트 생성 - 토재웅</title>
      </Helmet>
      <S.Container>
        <S.Selector onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
          <S.Option value={undefined}>카테고리 선택하세요.</S.Option>
          {categories?.map((category) => (
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
          <S.AddTagButton onClick={() => setTags([...tags, tagName])}>추가</S.AddTagButton>
          <S.InitButton onClick={() => setTags([])}>초기화</S.InitButton>
          {!tags.length ? <p>추가된 태그가 없습니다.</p> : <p>{JSON.stringify(tags)}</p>}
        </S.TagBox>

        <S.SubmitButton onClick={handleSubmit}>포스팅하기</S.SubmitButton>
      </S.Container>
    </>
  );
}

export default Post;
