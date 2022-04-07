import { Image } from 'antd'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/Button'
import ConnectButton from '../connect_button/ConnectButton'
import walletButton from '../../../assets/img/wallet_button.png'
import profileButton from '../../../assets/img/profile_button.png'
import logoutButton from '../../../assets/img/logout_button.png'

const style = {
    button: {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        border: 'none',
        marginRight: '3em'
    },
    buttonImg: {
        position: 'relative',
        zIndex: 2,
        top: '10px'
    }
}

const MenuButton = ({account, wrapSetAccount}) => {

    const logout = () => {
        localStorage.removeItem('account')
        wrapSetAccount(null)
    }

    return (
        <div
            style={{
                border: 'solid 1px #00FFA3',
                display: 'flex',
                justifyContent: 'space-between',
                margin: '2em 5em',
                padding: '0.5em 0em 0.5em 2em',
            }}
        >
            <div
                style={{
                    marginRight: '10em'
                }}
            >
                <p
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginBottom: 0
                    }}
                >
                    Name
                </p>
                <p
                    style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginBottom: 0
                    }}
                >
                    {JSON.parse(account).user.userName}
                </p>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    type={'href'}
                    url={''}
                    style={style.button}
                    text={
                        <Image
                            src={walletButton}
                            preview={false}
                            width={'120%'}
                            style={style.buttonImg}
                        />
                    }
                />
                <Button
                    type={'href'}
                    style={style.button}
                    url={`${process.env.REACT_APP_HOST}/user/profile`}
                    text={
                        <Image
                            src={profileButton}
                            preview={false}
                            width={'120%'}
                            style={style.buttonImg}
                        />
                    }
                />
                <Button
                    type={'function'}
                    style={style.button}
                    clickFunction={logout}
                    text={
                        <Image
                            src={logoutButton}
                            preview={false}
                            width={'120%'}
                            style={{...style.buttonImg, marginRight: 0}}
                        />}
                />
            </div>
        </div>
    )
}

export default MenuButton