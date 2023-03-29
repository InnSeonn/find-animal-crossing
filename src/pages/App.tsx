import GlobalStyle, { MaxLayout } from '../components/GlobalStyle';
import styled from 'styled-components';
import AppBar from '../components/AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './Search';
import Feature from './Feature';
import Result from './Result';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout className='App'>
        <Routes>
          <Route path='/' element={<Search />}></Route>
          <Route path='/feature/:page' element={<Feature />}></Route>
          <Route path='/feature/result' element={<Result />}></Route>
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
