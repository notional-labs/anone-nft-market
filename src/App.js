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
import NftProfile from './pages/Nft_profile/Index';
import CollectionCreate from './pages/Collection_create/Index';
import NftCreate from './pages/Nft_create/Index';
import NftMarketplace from './pages/Nft_market_place/Index';
import CollectionExplorer from './pages/Collection_explorer/Index'
import CreatePage from './pages/Create/Index';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [account, setAccount] = useState(localStorage.getItem('account'))

  useEffect(() => {
    const storageAccount = localStorage.getItem('account')
    if (storageAccount !== null) {
      setAccount(storageAccount)
    }
  }, [])

  const wrapSetAccount = useCallback((value) => {
    setAccount(value)
  }, [setAccount])

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
        <Route exact path="/" element={<HomePage
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/user/profile" element={<Profile
          type={'user-profile'}
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/profile/:id" element={<Profile
          type={'profile'}
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/create" element={<CreatePage
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/nft/marketplace" element={<NftMarketplace
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/collection/explorer" element={<CollectionExplorer
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/collection/:id" element={<Profile
          type={'collection'}
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/nft/:id" element={<NftProfile
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
      </Routes>
    </div>
  );
}

export default App;
