import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import HomepageLayout from './HomepageLayout';
import Main from './Main';
import TestPage from './TestPage';

const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='/test-page' element={<TestPage />}></Route>
      <Route path='/home' element={<HomepageLayout />}></Route>
    </Routes>
  </BrowserRouter>
)

export default MainRouter;
