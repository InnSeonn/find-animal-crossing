import SubTitle from '../components/SubTitle';
import { FaRegFlag } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { VillagerType } from 'villagers';
import RankingItem from '../components/RankingItem';

export type VillagerRankType = VillagerType & {
  ranking: number;
};

export default function Ranking() {
  const [featureFailMsg, setFeatureFailMessage] = useState('');
  const [favoriteFailMsg, setFavoriteFailMessage] = useState('');
  const [featureRank, setFeatureRank] = useState<VillagerRankType[] | undefined>(undefined);
  const [favoriteRank, setFavoriteRank] = useState<VillagerRankType[] | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/rank/feature`)
      .then((res) => setFeatureRank(res.data))
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          setFeatureFailMessage(e.response?.data.message);
        }
      });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/rank/favorite`)
      .then((res) => setFavoriteRank(res.data))
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          setFavoriteFailMessage(e.response?.data.message);
        }
      });
  }, []);

  return (
    <div>
      <RankingTitleBox>
        <SubTitle text='주민 랭킹' />
        <FaRegFlag className='icon-flag' />
      </RankingTitleBox>
      <RankingListBox>
        <p className='title'>
          사람들과
          <br />
          <span className='accent'>가장 많이 닮은</span> 주민은
        </p>
        {!featureFailMsg && (
          <RankingList>
            {featureRank &&
              featureRank.map((value, index) => <RankingItem key={index} item={value} category='feature' />)}
          </RankingList>
        )}
        {featureFailMsg && (
          <RankingFailMessageBox>
            <MdErrorOutline className='icon-error' />
            <p>아직 데이터가 부족해요.</p>
            <p>찾기 탭에서 나와 닮은 주민을 찾아보세요!</p>
          </RankingFailMessageBox>
        )}
      </RankingListBox>
      <RankingListBox>
        <p className='title'>
          사람들과
          <br />
          <span className='accent'>가장 취향이 비슷한</span> 주민은
        </p>
        {!favoriteFailMsg && (
          <RankingList>
            {favoriteRank &&
              favoriteRank.map((value, index) => <RankingItem key={index} item={value} category='favorite' />)}
          </RankingList>
        )}
        {favoriteFailMsg && (
          <RankingFailMessageBox>
            <MdErrorOutline className='icon-error' />
            <p>아직 데이터가 부족해요.</p>
            <p>찾기 탭에서 취향이 비슷한 주민을 찾아보세요!</p>
          </RankingFailMessageBox>
        )}
      </RankingListBox>
    </div>
  );
}

const RankingTitleBox = styled.div`
  display: flex;
  .icon-flag {
    margin-left: 0.5em;
    font-size: var(--font-size-xxl);
  }
`;
const RankingListBox = styled.div`
  padding: var(--font-size-xl);
  margin-top: calc(var(--padding-x) * 2);
  border-radius: var(--font-size-l);
  background-color: #fff;

  .title {
    line-height: 1.4;
    font-size: var(--font-size-m);
    .accent {
      color: var(--color-green);
      font-family: var(--font-b);
    }
  }
`;
const RankingList = styled.ol`
  margin-top: var(--font-size-l);
`;
const RankingFailMessageBox = styled.div`
  margin-top: 2em;
  line-height: 1.4;
  color: var(--color-grey);
  font-size: var(--font-size-xs);

  .icon-error {
    margin-bottom: 0.4em;
    font-size: var(--font-size-l);
  }
`;
