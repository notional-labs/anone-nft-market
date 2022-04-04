import { Image } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bannerLogo from '../../assets/img/logo1.png'
import ConnectButton from './connect_button/ConnectButton'
import MenuButton from './menu_button/MenuButton'

const style = {
    headerNavbar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '150px',
        postion: 'relative',
        zIndex: 2
    },
    logoContainer: {
        padding: '3em 7em'
    },
}

const Header = ({ }) => {
    const [account, setAccount] = useState(localStorage.getItem('account'))

    useEffect(() => {
        const storageAccount = localStorage.getItem('account')
        if (storageAccount !== '') {
            setAccount(storageAccount)
        }
    }, [])

    const wrapSetAccount = useCallback((value) => {
        setAccount(value)
    }, [setAccount])

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