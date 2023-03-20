import styled from 'styled-components'

const TitleParagraph = styled.p`
	margin-bottom: 1.4em;
	color: var(--color-grey-light);
	font-size: var(--font-size-m);
	font-family: 'ELAND_Choice_L';
`;

export default function Title() {
	return (
		<TitleParagraph>찾아봐요, 동물의 숲</TitleParagraph>
	)
}