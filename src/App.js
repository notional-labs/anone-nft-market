import './App.css';
import HomePage from './pages/HomePage/Index';
import Image from 'rc-image';
import background from './assets/img/background.png'
import {
  Routes,
  Route,
  Link,
  NavLink,
  useLocation
} from "react-router-dom";
import Profile from './pages/Profile/Index';

function App() {
  return (
    <div className="App">
      {/* background component */}
      <Image
        src={background}
        preview={false}
        style={{
          position: 'fixed',
          minWidth: '100%',
          left: 0,
          top: 0,
        }} />
      {/* end of background component */}

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/user/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
