import GlobalStyle, { MaxLayout } from '../components/GlobalStyle';
import styled from 'styled-components';
import AppBar from '../components/AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './Search';
import Feature from './Feature';

type PersonalityType = {
  [key: string]: string;
};
type SpeciesType = {
  [key: string]: string;
};
export const personality: PersonalityType = {
  Lazy: '먹보',
  Jock: '운동광',
  Cranky: '무뚝뚝',
  Smug: '느끼',
  Normal: '친절',
  Peppy: '아이돌',
  Snooty: '성숙',
  'Big sister': '단순활발',
};
export const species: SpeciesType = {
  Alligator: '악어',
  Anteater: '개미핥기',
  Bear: '곰',
  Bird: '새',
  Bull: '황소',
  Cat: '고양이',
  Cub: '아기곰',
  Chicken: '닭',
  Cow: '소',
  Deer: '사슴',
  Dog: '강아지',
  Duck: '오리',
  Eagle: '독수리',
  Elephant: '코끼리',
  Frog: '개구리',
  Goat: '염소',
  Gorilla: '고릴라',
  Hamster: '햄스터',
  Hippo: '하마',
  Horse: '말',
  Koala: '코알라',
  Kangaroo: '캥거루',
  Lion: '사자',
  Monkey: '원숭이',
  Mouse: '쥐',
  Octopus: '문어',
  Ostrich: '타조',
  Penguin: '펭귄',
  Rabbit: '토끼',
  Rhino: '코뿔소',
  Sheep: '양',
  Squirrel: '다람쥐',
  Tiger: '호랑이',
  Wolf: '늑대',
};

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout className='App'>
        <Routes>
          <Route path='/' element={<Search />}></Route>
          <Route path='/feature/:page' element={<Feature />}></Route>
        </Routes>
        <AppBar />
      </AppLayout>
    </BrowserRouter>
  );
}

const AppLayout = styled.div`
  ${MaxLayout}
  overflow: hidden scroll;
  height: calc(100vh - var(--app-bar-h));
  padding: var(--padding-container);
  ::-webkit-scrollbar {
    display: none;
  }
`;
