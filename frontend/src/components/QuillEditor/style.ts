import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { EditorStyle } from 'styles/editor';

export const Editor = styled(ReactQuill)`
  width: 100%;
  height: 700px;
  ${EditorStyle}
`;
