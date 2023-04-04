import { createGlobalStyle, css } from 'styled-components';
import Reset from 'styled-reset';

const Variables = css`
  :root {
    //layout size
    --max-w: 576px;
    --app-bar-h: 60px;

    //spacing
    --padding-container: 48px 20px;
    --padding-x: 20px;

    //color
    --color-light: #f4f1e9;
    --color-green: #688f4e;
    --color-green-light: #b1d182;
    --color-green-dark: #2b463c;
    --color-grey: #9d9a95;
    --color-grey-light: #9d9a9540;
    --color-accent: #ffa810;

    //font size
    --font-size-xxs: 12px;
    --font-size-xs: 14px;
    --font-size-s: 16px;
    --font-size-m: 18px;
    --font-size-l: 20px;
    --font-size-xl: 24px;
    --font-size-xxl: 32px;

    //font style
    --font-b: 'ELAND_Choice_B';
    --font-m: 'ELAND_Choice_M';
    --font-l: 'ELAND_Choice_L';

    //style
    --box-shadow: rgba(205, 205, 205, 0.37) 4px 4px 12px 0px;

    @media screen and (max-width: 400px) {
      :root {
        --padding-x: 5vw;

        --font-size-xxs: 3vw;
        --font-size-xs: 3.5vw;
        --font-size-s: 4vw;
        --font-size-m: 4.5vw;
        --font-size-l: 5vw;
        --font-size-xl: 6vw;
        --font-size-xxl: 8vw;
      }
    }
  }
`;

const Fonts = css`
  @font-face {
    font-family: 'ELAND_Choice_M';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/ELAND_Choice_M.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ELAND_Choice_B';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/ELAND_Choice_B.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ELAND_Choice_L';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/ELAND_Choice_L.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

export const MaxLayout = css`
  max-width: var(--max-w);
  width: 100%;
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  ${Reset}
  ${Variables}
  ${Fonts}

  * {
    box-sizing: border-box;
    letter-spacing: -0.03em;
  }
  html, body {
    overflow: hidden;
    height: 100vh;
    background-color: var(--color-light);
    font-family: 'ELAND_Choice_M';
  }
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  button {
    display: block;
    padding: 0;
    border: none;
    background: none;
    appearance: none;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
  }
`;
export default GlobalStyle;
