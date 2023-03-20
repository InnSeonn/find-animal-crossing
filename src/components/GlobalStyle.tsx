import { createGlobalStyle, css } from 'styled-components';
import Reset from 'styled-reset';

const Variables = css`
	:root {
		//layout size
		--max-w: 576px;

		//spacing
		--padding-container: 48px 20px 0;
		--padding-x: 20px;

		//color
		--color-light: #f4f1e9;
		--color-green: #688f4e;
		--color-green-light: #b1d182;
		--color-green-dark: #2b463c;
		--color-grey-light: #9d9a95;

		//font size
		--font-size-s: 14px;
		--font-size-m: 16px;
		--font-size-l: 24px;
		--font-size-xl: 48px;

		@media screen and (max-width: 576px) {
			:root {
				--font-size-s: 2.431vw;
				--font-size-m: 2.778vw;
				--font-size-l: 4.167vw;
				--font-size-xl: 8.333vw;
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
`
export default GlobalStyle;