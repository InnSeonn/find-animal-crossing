import styled from 'styled-components';
import { VillagerType } from '../hooks/useGetVillagers';

export default function SlideItem({ item }: { item: VillagerType }) {
  return (
    <>
      <ResultImage src={item.image_url} alt='' />
      <ResultNameParagraph>{item.name}</ResultNameParagraph>
      <ResultTagBox>
        <ResultTagParagraph>{item.gender}</ResultTagParagraph>
        <ResultTagParagraph>{item.personality}</ResultTagParagraph>
        <ResultTagParagraph>{item.species}</ResultTagParagraph>
      </ResultTagBox>
    </>
  );
}

const ResultImage = styled.img`
  display: block;
  width: 120px;
  margin: 40px auto;
  @media screen and (max-width: 400px) {
    width: 30vw;
    margin: 10vw auto;
  }
`;
const ResultNameParagraph = styled.p`
  font-size: var(--font-size-xl);
  font-family: var(--font-b);
  text-align: center;
`;
const ResultTagBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: var(--font-size-xs) 0;
`;
const ResultTagParagraph = styled.p`
  padding: 0.6em 1em;
  margin: 0.3em;
  border-radius: 2em;
  background-color: var(--color-green-dark);
  color: #fff;
  font-size: var(--font-size-xs);
  font-family: var(--font-l);
`;
