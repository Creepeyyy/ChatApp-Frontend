import './layout/css/App.css';
import PublicPage from './components/PublicPage';
import TopMenu from './components/TopMenu';

function App() {
  return (
    <div className="App bg-dark">
      <TopMenu/>
      <PublicPage/>
    </div>
  );
}

export default App;
