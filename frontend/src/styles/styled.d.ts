import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      [key: string]: string;
    };
    device: {
      [key: string]: string;
      mobile: string;
      tablet: string;
      laptop: string;
    };
  }
}
