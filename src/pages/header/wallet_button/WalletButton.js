import { Image, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/Button'
import walletButton from '../../../assets/img/wallet_button.png'
import { getBalance } from '../../../utils/user/getBalance'
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

    const handleClickWallet = () => {
        setShowWallet(true)
    }

    const onClose = () => {
        setShowWallet(false)
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
            >
                <Button
                    type={'function'}
                    clickFunction={handleClickWallet}
                    style={style.button}
                    text={
                        <Image
                            src={walletButton}
                            preview={false}
                            width={50}
                            style={style.buttonImg}
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