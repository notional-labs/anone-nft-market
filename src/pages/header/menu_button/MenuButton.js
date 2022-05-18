import { Image, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/Button'
import walletButton from '../../../assets/img/wallet_button.png'
import { getBalance } from '../../../utils/user/getBalance'
import './MenuButton.css'
import { MdOutlineAccountCircle, MdLogout } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const style = {
    button: {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        border: 'none',
    },
    buttonImg: {
        position: 'relative',
        zIndex: 2,
    }
}

const buttonType = [
    {
        logo: <MdOutlineAccountCircle />,
        text: 'Profile',
    },
    {
        logo: <FiSettings />,
        text: 'Settings'
    }, 
    {
        logo: <MdLogout />,
        text: 'Logout'
    }
]

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

    const getButtonText = (type) => {
        const icon = buttonType[type]
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    margin: 0
                }}
            >
                <div
                    style={{
                        marginRight: '20px',
                        marginBottom: 0,
                        position: 'relative',
                        fontSize: '2rem',
                        top: '5px'
                    }}
                >
                    {
                        icon.logo
                    }
                </div>
                <p
                    style={{
                        margin: 0,
                        position: 'relative',
                        top: '12px'
                    }}
                >
                    {icon.text}
                </p>
            </div>
        )
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
                    margin: 'auto 30px',
                    height: '100%',
                    top: '23px',
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
                            width={40}
                            style={{
                                ...style.buttonImg,
                                borderRadius: '50%',
                                border: pathname.includes('user/profile') ? 'solid 2px #00FFA3' : 'solid 2px #ffffff'
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
                                left: '-150%',
                                width: '400%',
                                top: '76%',
                                borderRadius: '0 0 10px 10px',
                                overflow: 'hidden',
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
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        width: '100%',
                                        padding: '.5em 1em',
                                        fontSize: '1rem'

                                    }}
                                    text={getButtonText(0)}
                                    type={'href'}
                                    url={`${process.env.REACT_APP_HOST}/user/profile`}
                                />
                            </div>
                            <div
                                className="upper-button"
                            >
                                <Button
                                    style={{
                                        border: 0,
                                        backgroundColor: 'transparent',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        width: '100%',
                                        padding: '.5em 1em',
                                        fontSize: '1rem'

                                    }}
                                    text={getButtonText(1)}
                                    type={'link'}
                                    url={`/user/edit`}
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
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        width: '100%',
                                        padding: '.5em 1em'
                                    }}
                                    clickFunction={logout}
                                    text={
                                        getButtonText(2)
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