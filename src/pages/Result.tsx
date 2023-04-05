import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { VillagerType } from 'villagers';
import { FaReply, FaBook } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setBirthday, setFavorite, setFeature } from '../store/resultSlice';
import Loading from '../components/Loading';
import ResultFail from '../components/ResultFail';
import ResultSuccess from '../components/ResultSuccess';

export default function Result() {
  const location = useLocation();
  const search = location.pathname
    .match(/(?:\/)(.*?)(?=\/result)/g)
    ?.toString()
    .replace('/', '');
  const result = useSelector((state: RootState) =>
    search === 'feature'
      ? state.result.feature
      : search === 'birthday'
      ? state.result.birthday
      : search === 'favorite'
      ? state.result.favorite
      : undefined
  );
  const dispatch = useDispatch();
  const setFunc =
    search === 'feature'
      ? setFeature
      : search === 'birthday'
      ? setBirthday
      : search === 'favorite'
      ? setFavorite
      : undefined;
  const [matchResult, setMatchResult] = useState<VillagerType[] | undefined>(() => {
    if (!result) {
      return undefined;
    }
    if (location.key === result.key) {
      return result.data;
    } else {
      return undefined;
    }
  });
  const [failMessage, setFailMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!setFunc) return;
    if (!matchResult) {
      axios
        .get(`http://localhost:8080/villagers/${search}`, { params: location.state })
        .then((res) => {
          setMatchResult(res.data);
          dispatch(
            setFunc({
              key: location.key,
              data: res.data,
            })
          );
        })
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            setFailMessage(e.response?.data.message);
          }
        });
    }
  }, []);

  useLayoutEffect(() => {
    //이미지 버벅임 방지를 위해 첫번째 이미지가 로드 완료되면 결과 화면 표시
    if (matchResult) {
      matchResult.map((value, index) => {
        const img = new Image();
        img.src = value.img_url;
        if (index === 0) {
          img.onload = () => {
            setSuccess(true);
          };
        }
      });
    }
  }, [matchResult]);

  return (
    <>
      <div>
        <Title />
        {/* 로딩 화면 */}
        {!success && !failMessage && <Loading />}
        {(success || failMessage) && (
          <>
            {/* 성공 화면 */}
            {matchResult && (
              <>
                <SubTitle
                  text={
                    search === 'feature'
                      ? '나와 닮은<br>주민은..'
                      : search === 'birthday'
                      ? '나와 생일이 같은<br>주민은..'
                      : search === 'favorite'
                      ? '나와 취향이 비슷한 주민은..'
                      : ''
                  }
                />
                <ResultSuccess state={matchResult} />
              </>
            )}
            {/* 실패 화면 */}
            {failMessage && <ResultFail message={failMessage} />}
            {/* 이동 버튼 */}
            <ResultLinkBox>
              <ResultLink to={location.pathname.replace('result', '1')}>
                <ResultIcon>
                  <FaReply className='icon' />
                </ResultIcon>
                <span className='text'>다시하기</span>
              </ResultLink>
              {/* TODO: 링크 변경 */}
              {matchResult && matchResult.length > 0 && (
                <ResultLink to={'/book'}>
                  <span className='text'>도감 확인하기</span>
                  <ResultIcon>
                    <FaBook className='icon' />
                  </ResultIcon>
                </ResultLink>
              )}
            </ResultLinkBox>
          </>
        )}
      </div>
    </>
  );
}

//하단 링크 버튼
const ResultLinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ResultLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-top: var(--font-size-xxl);
  font-size: var(--font-size-xs);
  transition: opacity 0.5s;
  @media screen and (any-pointer: fine) {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  & .text {
    display: inline-block;
    margin: 0 0.6em;
  }
`;
export const ResultIcon = styled.span`
  display: inline-block;
  padding: 0.8em;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  & .icon {
    display: block;
  }
`;
