import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { VillagerType } from 'villagers';

export default function SlideItem({ item }: { item: VillagerType }) {
  const pathname = useLocation().pathname;
  const tags = pathname.includes('feature')
    ? [item.gender, item.personality, item.species]
    : pathname.includes('birthday')
    ? [item.birthday_month + '월', item.birthday_day + '일']
    : pathname.includes('favorite')
    ? [item.hobby, ...item.favorite_color, ...item.favorite_style]
    : undefined;

  return (
    <>
      <ResultImage src={item.img_url} alt='' />
      <ResultNameParagraph>{item.name_kr}</ResultNameParagraph>
      <ResultTagBox>
        {tags && tags.map((tag, index) => <ResultTagParagraph key={index}>{tag}</ResultTagParagraph>)}
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
  font-size: var(--font-size-xxl);
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
