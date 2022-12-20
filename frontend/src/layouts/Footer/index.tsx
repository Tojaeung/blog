import * as S from './style';

const Footer = () => {
  return (
    <S.Container>
      <S.Logo>Tojaeung</S.Logo>

      <S.IconBox>
        <a href='https://github.com/Tojaeung' target='_blank' rel='noreferrer'>
          <S.GithubIcon size={25} color='black' />
        </a>
        <a href='https://www.instagram.com/tojaeung1027' target='_blank' rel='noreferrer'>
          <S.InstaIcon size={25} color='black' />
        </a>
        <a href='https://solved.ac/tojaeung' target='_blank' rel='noreferrer'>
          <S.BrainIcon size={25} color='black' />
        </a>
        <a href='https://soundcloud.com/tojaeung' target='_blank' rel='noreferrer'>
          <S.SoundcloudIcon size={25} color='black' />
        </a>
      </S.IconBox>

      <S.CopyRightText>Copyrightⓒ 2022 Tojaeung All Rights Reserved</S.CopyRightText>
    </S.Container>
  );
};

export default Footer;
