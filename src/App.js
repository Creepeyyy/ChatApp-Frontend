import './layout/css/App.css';
import PublicPage from './components/publicPageComponents/PublicPage';
import TopMenu from './components/TopMenu';
import { useSelector } from 'react-redux';
import PrivatePage from './components/privatePageComponents/PrivatePage'

function App() {
  const { token } = useSelector((state) => state.authentication);
  return (
    <div className="App bg-dark">
      <TopMenu />
      {token ? <PrivatePage /> : <PublicPage />}
    </div>
  );
}

export default App;
