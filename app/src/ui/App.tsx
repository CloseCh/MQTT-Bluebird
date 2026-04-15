import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import { HashRouter, Route, Routes } from 'react-router';

import MainPage from './layout/MainLayout/page/MainPage';
import MainLayout from './layout/MainLayout/MainLayout';
import './index.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}


