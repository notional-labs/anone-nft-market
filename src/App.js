import './App.css';
import HomePage from './pages/HomePage/Index';
import Image from 'rc-image';
import background from './assets/img/background.png'

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

      <HomePage />
    </div>
  );
}

export default App;
