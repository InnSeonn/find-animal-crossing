import styled from 'styled-components';

const TitleParagraph = styled.p`
  margin-bottom: 1.4em;
  color: var(--color-grey);
  font-size: var(--font-size-xs);
  font-family: var(--font-l);
`;

export default function Title() {
  return <TitleParagraph>찾아봐요, 동물의 숲</TitleParagraph>;
}
