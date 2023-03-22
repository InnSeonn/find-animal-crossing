import GlobalStyle, { MaxLayout } from '../components/GlobalStyle';
import styled from 'styled-components';
import AppBar from '../components/AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './Search';

const AppLayout = styled.div`
  ${MaxLayout}
  min-height: 100vh;
  padding: var(--padding-container);
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <AppLayout className='App'>
        <Routes>
          <Route path='/' element={<Search/>}></Route>
        </Routes>
        <AppBar/>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;