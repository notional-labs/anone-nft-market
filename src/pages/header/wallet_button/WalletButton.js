import { Image, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/Button'
import walletButton from '../../../assets/img/wallet_button.png'
import { getBalance } from '../../../utils/user/getBalance'
import { AiOutlineWallet } from "react-icons/ai";
import './WalletButton.css'

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
        top: '5px'
    }
}

const WalletButton = ({ account, wrapSetAccount }) => {
    const [showWallet, setShowWallet] = useState(false)
    const [balances, setBalances] = useState([])
    const [hover, setHover] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const res = await getBalance(JSON.parse(account).account.address)
                setBalances([...res])
            }
            catch (e) {
                console.log(e)
            }
        })()
    }, [showWallet])

    const handleClickWallet = () => {
        setShowWallet(true)
    }

    const onClose = () => {
        setShowWallet(false)
    }

    const handleMouseOver = () => {
        setHover(true)
    }

    const handleMouseLeft = () => {
        setHover(false)
    }

    return (
        <div>
            <div
                style={{
                    position: 'relative',
                    margin: 'auto 20px',
                    height: '100%',
                    top: '20%',
                    zIndex: 2,
                }}
                className="menu-hover-button"
            >
                <Button
                    type={'function'}
                    clickFunction={handleClickWallet}
                    style={style.button}
                    text={
                        <AiOutlineWallet
                            style={{
                                fontSize: '3em',
                            }}
                        />
                    }
                />
            </div>

            <Drawer
                title="My Wallet"
                placement="right"
                onClose={onClose}
                visible={showWallet}
            >
                {
                    balances.map(balance => {
                        return (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '24px',
                                    border: 'solid 1px #00FFA3',
                                    color: '#ffffff',
                                    padding: '1em',
                                    borderRadius: '10px'
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}
                                >
                                    {parseInt(balance.amount) / 1000000}
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        color: '#00FFA3'
                                    }}
                                >
                                    AN1
                                </p>
                            </div>
                        )
                    })
                }
            </Drawer>
        </div>
    )
}

export default WalletButton