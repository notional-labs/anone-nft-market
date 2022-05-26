import './App.css';
import HomePage from './pages/HomePage/Index';
import Image from 'rc-image';
import background from './assets/img/background.svg'
import {
  Routes,
  Route} from "react-router-dom";
import Profile from './pages/Profile/Index';
import NftProfile from './pages/Nft_profile/Index';
import NftMarketplace from './pages/Nft_market_place/Index';
import CollectionExplorer from './pages/Collection_explorer/Index'
import CreatePage from './pages/Create/Index';
import EditPage from './pages/Edit/Index';
import { useState, useEffect, useCallback } from 'react';
import CollectionEdit from './pages/Collection_edit/Index';

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
        width={'100%'}
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
        <Route exact path="/user/edit" element={<EditPage
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
        <Route exact path="/collection/:id/edit" element={<CollectionEdit
          type={'collection'}
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
        <Route exact path="/nft/:id/:contract" element={<NftProfile
          account={account}
          wrapSetAccount={wrapSetAccount}
        />} />
      </Routes>
    </div>
  );
}

export default App;
