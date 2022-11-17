import type { GetServerSideProps, NextPage } from 'next';
import { getCategories } from 'apis/category';
import { getPostsTop5 } from 'apis/post';
import Intro from 'components/Intro';
import HomePost from 'components/HomePost';
import HomeCategory from 'components/HomeCategory';

import { CategoryType } from 'interfaces/category';
import { PostType } from 'interfaces/post';

interface IProps {
  categories: CategoryType[];
  postsTop5: PostType[];
}

const Home: NextPage<IProps> = ({ categories, postsTop5 }) => {
  return (
    <Container>
      <HeadMeta
        title="토재웅님의 블로그"
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url="https://tojaeung.com"
      />
      <Intro />

      <Title>가장 인기있는 포스팅 Top5</Title>
      <Box>
        <HomePost postsTop5={postsTop5} />
        <HomeCategory categories={categories} />
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categories = await getCategories();
  const postsTop5 = await getPostsTop5();

  return {
    props: {
      categories,
      postsTop5,
    },
  };
};

import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/globalStyle';
import HeadMeta from 'layouts/HeadMeta';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
  }
`;

const Title = styled(CommonTitleStyle)``;

export default Home;
