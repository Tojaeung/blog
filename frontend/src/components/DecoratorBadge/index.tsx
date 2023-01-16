import * as S from './style';
import { IProp } from './type';

function DecoratorBadge({ text }: IProp) {
  return (
    <S.Container>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default DecoratorBadge;
