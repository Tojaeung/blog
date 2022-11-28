import styled from 'styled-components';
import { CommonInputStyle } from 'styles/common';
import { AiOutlineSearch } from 'react-icons/ai';

export const Container = styled.div`
  position: relative;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 8px;
  left: 5px;
`;
export const SearchInput = styled(CommonInputStyle)`
  padding-left: 30px;
`;
