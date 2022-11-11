import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  palette: {
    white: '#ffffff',
    black: '#4a5568',
    mainColor: '#baabda',
    cardBgColor: '#F8F8FF',
    bgColor: '#f8f5fa',
    boxShdow: 'rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px',
    titleColor: '#2d3748',
    textColor: '#718096',
    badgeColor: '#e2e8f0',
    gradationColor: 'linear-gradient(120deg, #4a90e2, #bd10e0)',
    inputColor: '#f7f7f7',
  },

  font: {
    title: 'Do Hyeon',
    logo: 'Jua',
    en: 'Roboto',
    text: 'Noto Sans KR',
  },

  device: {
    mobile: `screen and (max-width: 425px)`,
    tablet: `screen and (max-width: 768px)`,
    laptop: `screen and (max-width: 1024px)`,
  },
};
