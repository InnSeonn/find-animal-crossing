import styled, { css } from 'styled-components';
import { VillagerRankType } from '../pages/Ranking';

type RankingItemProps = {
  category: string;
  item: VillagerRankType;
};

export default function RankingItem({ item, category }: RankingItemProps) {
  const { ranking, name_kr, img_url } = item;
  const rank = category === 'feature' ? item.rank.feature : item.rank.favorite;

  return (
    <RankingListItem ranking={ranking}>
      <p className='ranking'>{ranking}</p>
      <div className='img-box'>
        <img src={img_url} alt='' />
      </div>
      <p className='name'>{name_kr}</p>
      <p className='count'>{rank}번</p>
    </RankingListItem>
  );
}

const RankingListItem = styled.li<{ ranking: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2em;
  padding: 1em 1em 0;
  &:not(:last-child) {
    padding-bottom: 1em;
    border-bottom: 0.6px solid var(--color-grey-light);
  }
  @media screen and (max-width: 300px) {
    padding: 0.5em 0.5em 0;
    &:not(:last-child) {
      padding-bottom: 0.5em;
    }
  }

  .ranking {
    padding-right: 1em;
    font-size: var(--font-size-l);
    font-family: var(--font-b);
    text-align: center;
    ${(props) =>
      props.ranking === 1 &&
      css`
        color: var(--color-accent);
      `}
  }
  .img-box {
    width: 60px;
    height: 60px;
    @media screen and (max-width: 300px) {
      width: 40px;
      height: 40px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center top;
    }
  }
  .name {
    padding: 0.4em 0.8em;
    border-radius: 1em;
    background-color: var(--color-grey-light);
    font-size: var(--font-size-xs);
    ${(props) =>
      props.ranking === 1 &&
      css`
        background-color: var(--color-accent);
        color: #fff;
      `}
  }
  .count {
    flex-grow: 1;
    text-align: right;
    color: var(--color-grey);
    font-size: var(--font-size-xxs);
  }
`;
