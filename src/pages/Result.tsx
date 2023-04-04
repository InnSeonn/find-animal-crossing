import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { VillagerType } from 'villagers';
import { FaReply, FaBook } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { TbFaceIdError } from 'react-icons/tb';
import { SyncLoader } from 'react-spinners';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import SlideItem from '../components/SlideItem';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFeature } from '../store/resultSlice';

export default function Result() {
  const location = useLocation();
  const result = useSelector((state: RootState) => state.result);
  const dispatch = useDispatch();
  const [matchResult, setMatchResult] = useState<VillagerType[] | undefined>(() => {
    if (!result.feature) {
      return undefined;
    }
    if (location.key === result.feature.key) {
      return result.feature.data;
    } else {
      return undefined;
    }
  });
  const [failMessage, setFailMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!matchResult) {
      axios
        .get(`http://localhost:8080/villagers/feature`, { params: location.state })
        .then((res) => {
          setMatchResult(res.data);
          dispatch(
            setFeature({
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
        {!success && !failMessage && (
          <ResultLoadingBox>
            <ResultLoaderBox>
              <SyncLoader size='18px' margin='5px' speedMultiplier={1.2} color='#9d9a95' />
            </ResultLoaderBox>
            <p className='loading-text'>일치하는 주민을 찾고 있어요</p>
            <p className='loading-wait'>잠시만 기다려 주세요</p>
          </ResultLoadingBox>
        )}
        {(success || failMessage) && (
          <>
            {/* 성공 화면 */}
            {matchResult && (
              <>
                <SubTitle text={'나와 닮은 주민은..'} />
                <StyledSwiper
                  modules={[Navigation, Pagination]}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  navigation
                  pagination={{
                    type: 'fraction',
                  }}
                >
                  {matchResult.map((value, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <SlideItem item={value} />
                      </SwiperSlide>
                    );
                  })}
                </StyledSwiper>
              </>
            )}
            {/* 실패 화면 */}
            {failMessage && (
              <ResultFailBox>
                <SubTitle text='아쉽게도 일치하는<br>주민이 없어요 :(' />
                <TbFaceIdError className='icon-tear' />
                <ResultFailParagraph>다른 선택지를 골라보세요!</ResultFailParagraph>
                <ResultFailTipBox>
                  <ResultFailTipParagraph>
                    <HiOutlineLightBulb className='icon-bulb' /> <span>{failMessage}</span>
                  </ResultFailTipParagraph>
                </ResultFailTipBox>
              </ResultFailBox>
            )}
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

const squareSize = css`
  width: 150px;
  height: 150px;
  margin: 8vh auto;
  @media screen and (max-width: 400px) {
    width: 37.5vw;
    height: 37.5vw;
  }
`;

//로딩 화면
const ResultLoadingBox = styled.div`
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
const ResultLoaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${squareSize}
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;

//하단 링크 버튼
const ResultLinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ResultLink = styled(Link)`
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

//결과 화면
const ResultIcon = styled.span`
  display: inline-block;
  padding: 0.8em;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  & .icon {
    display: block;
  }
`;
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
//슬라이드
const StyledSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: #000;
    -webkit-tap-highlight-color: transparent;
    &::after {
      font-size: var(--font-size-xxl);
    }
  }
  .swiper-pagination {
    position: relative;
    width: 4em;
    padding: 0.6em;
    margin: 1em auto 0;
    border-radius: 2em;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: var(--font-size-xs);
    &-current {
      color: var(--color-accent);
      font-family: var(--font-b);
    }
    &-total {
    }
  }
`;
