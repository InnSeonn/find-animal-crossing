import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import SlideItem from '../components/SlideItem';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { VillagerType } from 'villagers';

export default function ResultSuccess({ state }: { state: VillagerType[] }) {
  return (
    <StyledSwiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      navigation
      pagination={{
        type: 'fraction',
      }}
    >
      {state?.map((value, index) => {
        return (
          <SwiperSlide key={index}>
            <SlideItem item={value} />
          </SwiperSlide>
        );
      })}
    </StyledSwiper>
  );
}

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
