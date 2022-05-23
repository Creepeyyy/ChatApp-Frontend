import './layout/css/App.css';
import PublicPage from './components/publicPageComponents/PublicPage';
import TopMenu from './components/TopMenu';
import PrivatePage from './components/privatePageComponents/PrivatePage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from './components/NotFound';

function App() {
  const { token } = useSelector((state) => state.authentication);
  return (
    <div className="App bg-dark">
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<PublicPage />} />
          {token ? <Route path="/my/*" element={<PrivatePage />} /> : <Route path="/my" element={<Navigate to="/" />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
