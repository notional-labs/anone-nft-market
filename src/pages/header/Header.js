import { Image, Input } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bannerLogo from '../../assets/img/logo1.png'
import ConnectButton from './connect_button/ConnectButton'
import MenuButton from './menu_button/MenuButton'
import CreateButton from './create_button/CreateButton'
import MarketplaceButton from './marketplace_button/MarketplaceButton'
import WalletButton from './wallet_button/WalletButton'
import { useLocation } from 'react-router-dom'

const style = {
    headerNavbar: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: 2,
        backgroundColor: '#000000',
        width: '100%',
        top: 0,
        boxShadow: '0 1px 20px -2px #363636'
    },
    logoContainer: {
        padding: '3em'
    },
}

const Header = ({ account, wrapSetAccount }) => {
    const [search, setSearch] = useState('')
    const { pathname } = useLocation()  

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div
            style={style.headerNavbar}
        >
            <div
                style={style.logoContainer}
            >
                <Link
                    to='/'
                >
                    <Image
                        src={bannerLogo}
                        preview={false}
                        width={140}
                    />
                </Link>
            </div>
            <Input
                placeholder="Search"
                onChange={handleInputChange}
                style={{
                    height: '10%',
                    backgroundColor: 'transparent',
                    border: 'solid 1px #00FFA3',
                    color: '#ffffff',
                    padding: '10px',
                    margin: 'auto',
                    position: 'relative',
                    zIndex: 0,
                    width: '40%'
                }}
            />
            <MarketplaceButton 
                pathname={pathname}
            />
            <CreateButton
                pathname={pathname}
            />
            {
                account === null ? (
                    <div>
                        <ConnectButton
                            wrapSetAccount={wrapSetAccount}
                        />
                    </div>
                ) : (
                    <>
                        <MenuButton
                            account={account}
                            wrapSetAccount={wrapSetAccount}
                            pathname={pathname}
                        />
                        <WalletButton
                            account={account}
                            wrapSetAccount={wrapSetAccount}
                            pathname={pathname}
                        />
                    </>
                )
            }
        </div>
    )
}

export default Header