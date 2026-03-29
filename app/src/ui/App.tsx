import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HashRouter, Route, Routes } from 'react-router';

import MainPage from './layout/pages/main/MainPage';
import MainLayout from './layout/MainLayout/MainLayout';

import PublishLayout from './layout/PublishLayout/PublishLayout';
import PublishPage from './layout/pages/publish/PublishPage';

import './index.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
        </Route>

        <Route element={<PublishLayout />}>
          <Route path='publish' element={<PublishPage/>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}


