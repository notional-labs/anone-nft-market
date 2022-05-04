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

    const logout = () => {
        localStorage.removeItem('account')
        wrapSetAccount(null)
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
                                position: 'absolute',
                                textAlign: 'center',
                                left: '-90%',
                                width: '300%',
                                top: '79%',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                className="upper-button"
                            >
                                <Button
                                    style={{
                                        border: 0,
                                        backgroundColor: 'transparent',
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        width: '100%',
                                        padding: '2em'

                                    }}
                                    text={'Profile'}
                                    type={'href'}
                                    url={`${process.env.REACT_APP_HOST}/user/profile`}
                                />
                            </div>
                            <div
                                className="lower-button"
                            >
                                <Button
                                    type={'function'}
                                    style={{
                                        border: 0,
                                        backgroundColor: 'transparent',
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        width: '100%',
                                        padding: '2em'
                                    }}
                                    clickFunction={logout}
                                    text={
                                        'Logout'
                                    }
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MenuButton