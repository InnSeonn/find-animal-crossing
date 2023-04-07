import styled, { css } from 'styled-components';
import { SyncLoader } from 'react-spinners';

export default function Loading() {
  return (
    <LoadingBox>
      <LoaderBox>
        <SyncLoader size='1em' margin='0.4em' speedMultiplier={1.2} color='#9d9a95' />
      </LoaderBox>
      <p className='loading-text'>일치하는 주민을 찾고 있어요</p>
      <p className='loading-wait'>잠시만 기다려 주세요</p>
    </LoadingBox>
  );
}

//로딩 화면
export const squareSize = css`
  width: 150px;
  height: 150px;
  margin: 8vh auto;
  @media screen and (max-width: 400px) {
    width: 37.5vw;
    height: 37.5vw;
  }
`;
const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vh;
  text-align: center;
  & .loading-text {
    font-size: var(--font-size-l);
    font-family: var(--font-b);
  }
  & .loading-wait {
    margin-top: 1em;
    color: var(--color-grey);
    font-size: var(--font-size-xs);
    font-family: var(--font-l);
  }
`;
const LoaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${squareSize}
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: var(--font-size-m);
`;
