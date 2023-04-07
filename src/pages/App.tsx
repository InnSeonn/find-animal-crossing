import GlobalStyle, { MaxLayout } from '../components/GlobalStyle';
import styled from 'styled-components';
import AppBar from '../components/AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './Search';
import Feature from './Feature';
import Result from './Result';
import Ranking from './Ranking';
import Birthday from './Birthday';
import Favorite from './Favorite';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout className='App'>
        <Routes>
          <Route path='/' element={<Search />}></Route>
          <Route path='/feature/:page' element={<Feature />}></Route>
          <Route path='/feature/result' element={<Result />}></Route>
          <Route path='/birthday/:page' element={<Birthday />}></Route>
          <Route path='/birthday/result' element={<Result />}></Route>
          <Route path='/favorite/:page' element={<Favorite />}></Route>
          <Route path='/favorite/result' element={<Result />}></Route>
          <Route path='/rank' element={<Ranking />}></Route>
        </Routes>
        <AppBar />
      </AppLayout>
    </BrowserRouter>
  );
}

const AppLayout = styled.div`
  ${MaxLayout}
  overflow: hidden scroll;
  height: 100%;
  padding: var(--padding-container);
  ::-webkit-scrollbar {
    display: none;
  }
`;
