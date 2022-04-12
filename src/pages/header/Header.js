import { Image, Input } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bannerLogo from '../../assets/img/logo1.png'
import ConnectButton from './connect_button/ConnectButton'
import MenuButton from './menu_button/MenuButton'
import CreateButton from './create_button/CreateButton'

const style = {
    headerNavbar: {
        display: 'flex',
        justifyContent: 'space-between',
        postion: 'relative',
        zIndex: 2
    },
    logoContainer: {
        padding: '3em 7em'
    },
}

const Header = ({ account, wrapSetAccount }) => {
    const [search, setSearch] = useState('')

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
                    width: '40%',
                    height: '10%',
                    backgroundColor: 'transparent',
                    border: 'solid 1px #00FFA3',
                    color: '#ffffff',
                    padding: '10px',
                    margin: 'auto',
                    position: 'relative',
                    zIndex: 0
                }}
            />
            <CreateButton />
            {
                account === null ? (
                    <div>
                        <ConnectButton
                            wrapSetAccount={wrapSetAccount}
                        />
                    </div>
                ) : (
                    <div>
                        <MenuButton
                            account={account}
                            wrapSetAccount={wrapSetAccount}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default Header