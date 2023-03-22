import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaRegSmileWink, FaRegHeart } from 'react-icons/fa';
import { HiOutlineCake } from 'react-icons/hi';
import Title from '../components/Title';
import SubTitle from '../components/SubTitle';

const SearchCardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: var(--padding-x);
  margin-top: calc(var(--padding-x) * 2);
`;
const SearchCard = styled.article`
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 4px 4px 12px 0px #cdcdcd5e;
  transition: opacity 0.5s;
  @media screen and (any-pointer: fine) {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
`;
const SearchCardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px 24px 20%;
  & > svg {
    color: var(--color-green);
    font-size: var(--font-size-xl);
  }
`;
const SearchCardText = styled.span`
  width: 50%;
  padding-top: 0.5em;
  font-size: var(--font-size-l);
  font-family: 'ELAND_Choice_B';
  line-height: 1.4;
  word-break: keep-all;
`;

export default function Search() {
  return (
    <div>
      <Title/>
      <SubTitle text={`나와 닮은<br>동물의 숲 주민을<br>찾아보세요!`}/>
      <SearchCardBox>
        <SearchCardLink to='/feature'>
          <FaRegSmileWink/>
          <SearchCardText>나와 닮은</SearchCardText>
        </SearchCardLink>
        <SearchCardLink to='/birthday'>
          <HiOutlineCake/>
          <SearchCardText>생일이 같은</SearchCardText>
        </SearchCardLink>
        <SearchCardLink to='/favorite'>
          <FaRegHeart/>
          <SearchCardText>취향이 비슷한</SearchCardText>
        </SearchCardLink>
      </SearchCardBox>
    </div>
  )
}