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
`;

const Title = styled(CommonTitleStyle)``;

export default Home;
