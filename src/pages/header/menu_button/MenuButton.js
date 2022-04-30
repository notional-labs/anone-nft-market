import { Image, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/Button'
import walletButton from '../../../assets/img/wallet_button.png'
import { getBalance } from '../../../utils/user/getBalance'
import './MenuButton.css'

const style = {
    button: {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        border: 'none',
    },
    buttonImg: {
        position: 'relative',
        zIndex: 2,
        top: '5px'
    }
}

const MenuButton = ({ account, wrapSetAccount, pathname }) => {
    const [showProfile, setShowProfile] = useState(false)
    const [showWallet, setShowWallet] = useState(false)
    const [balances, setBalances] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const res = await getBalance(JSON.parse(account).account.address)
                console.log(res)
                setBalances([...res])
            }
            catch (e) {
                console.log(e)
            }
        })()
    }, [showWallet])

    const logout = () => {
        localStorage.removeItem('account')
        wrapSetAccount(null)
    }

    const handleClickWallet = () => {
        setShowWallet(true)
    }

    const onClose = () => {
        setShowWallet(false)
    }

    const handleMouseOver = () => {
        setShowProfile(true)
    }

    const handleMouseLeft = () => {
        setShowProfile(false)
    }

    return (
        <div
            style={{
                borderBottom: pathname.includes('user/profile') ? 'solid 2px #00FFA3' : 'none',
            }}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeft}
        >
            <div
                style={{
                    position: 'relative',
                    margin: 'auto 50px',
                    height: '100%',
                    top: '20%',
                    zIndex: 2,
                }}
            >
                <Button
                    type={'href'}
                    style={style.button}
                    url={`${process.env.REACT_APP_HOST}/user/profile`}
                    text={
                        <Image
                            src={JSON.parse(account).user.avt}
                            preview={false}
                            width={50}
                            style={{
                                ...style.buttonImg,
                                borderRadius: '50%',
                            }}
                        />
                    }
                />
                {
                    showProfile && (
                        <div
                            style={{
                                backgroundColor: '#626262',
                                padding: '1em',
                                position: 'absolute',
                                textAlign: 'center',
                                left: '-90%',
                                width: '300%',
                                top: '79%',
                                borderRadius: '10px'
                            }}
                        >
                            <Button
                                style={{
                                    border: 0,
                                    backgroundColor: 'transparent',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: '1em'

                                }}
                                text={'Profile'}
                                type={'href'}
                                url={`${process.env.REACT_APP_HOST}/user/profile`}
                            />
                            <Button
                                type={'function'}
                                style={{
                                    border: 0,
                                    backgroundColor: 'transparent',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: '1em'

                                }}
                                clickFunction={logout}
                                text={
                                    'Logout'
                                }
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MenuButton