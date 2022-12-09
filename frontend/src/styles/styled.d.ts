import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      [key: string]: string;
      white: string;
      black: string;
      mainColor: string;
      cardBgColor: string;
      bgColor: string;
      boxShdow: string;
      titleColor: string;
      textColor: string;
      badgeColor: string;
      gradationColor: string;
      inputColor: string;
      brightGray: string;
      darkGray: string;
    };

    font: {
      [key: string]: string;
      title: string;
      logo: string;
      en: string;
      text: string;
    };

    device: {
      [key: string]: string;
      mobile: string;
      tablet: string;
      laptop: string;
    };
  }
}
