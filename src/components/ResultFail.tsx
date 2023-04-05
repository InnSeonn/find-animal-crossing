import styled from 'styled-components';
import { squareSize } from './Loading';
import SubTitle from './SubTitle';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { TbFaceIdError } from 'react-icons/tb';

export default function ResultFail({ message }: { message: string }) {
  return (
    <ResultFailBox>
      <SubTitle text='아쉽게도 일치하는<br>주민이 없어요 :(' />
      <TbFaceIdError className='icon-tear' />
      <ResultFailParagraph>다른 선택지를 골라보세요!</ResultFailParagraph>
      <ResultFailTipBox>
        <ResultFailTipParagraph>
          <HiOutlineLightBulb className='icon-bulb' /> <span>{message}</span>
        </ResultFailTipParagraph>
      </ResultFailTipBox>
    </ResultFailBox>
  );
}

const ResultFailBox = styled.div`
  & .icon-tear {
    display: block;
    ${squareSize}
  }
`;
const ResultFailParagraph = styled.p`
  padding: 1em 0;
  text-align: center;
  color: var(--color-grey);
  font-size: var(--font-size-xxs);
  font-family: var(--font-l);
`;
const ResultFailTipBox = styled.div`
  text-align: center;
`;
const ResultFailTipParagraph = styled.p`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.4em 1.2em;
  border-radius: 2em;
  background-color: var(--color-accent);
  color: #fff;
  font-size: var(--font-size-xs);
  & .icon-bulb {
    margin: 0 0.2em 2px 0;
    font-size: 1.5em;
  }
`;
