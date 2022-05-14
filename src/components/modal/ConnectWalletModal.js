import { Modal, Image } from "antd"
import Button from "../buttons/Button"
import { dummyConnectWallet } from "../../utils/getKeplr"
import keplrLogo from '../../assets/img/keplr.png'
import { openNotification } from '../notifications/notification'

const style = {
    button: {
        border: 'solid 1px #00FFA3',
        backgroundColor: 'transparent',
        color: '#ffffff',
        width: '100%',
        padding: '1em',
        cursor: 'pointer'
    }
}

const text = (
    <div>
        <Image
            src={keplrLogo}
            preview={false}
            width={'20%'}
        />
        <span
            style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginLeft: '20px',
                position: 'relative',
                top: '5px'
            }}
        >
            Keplr
        </span>
    </div>
)

const ConnectWalletModal = ({ show, wrapSetShow, wrapSetAccount }) => {


    const handleClick = () => {
        dummyConnectWallet().then(() => {
            wrapSetAccount(localStorage.getItem('account'))
            wrapSetShow(false)
            openNotification('success', 'Connect successfully')
        }).catch(e => {
            console.log(e)
            openNotification('error', e.message)
        }
        )
    }

    return (
        <div>
            <Modal
                visible={show}
                footer={null}
                closable={false}
                style={{
                    padding: '3em',
                }}
            >
                <p
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}
                >
                    You'll need a wallet on Another-1 to continue
                </p>
                <hr
                    style={{
                        width: '30%'
                    }}
                />
                <p
                    style={{
                        fontSize: '16px',
                        color: '#ffffff',
                        textAlign: 'center',
                        marginTop: '40px'
                    }}
                >
                    Safely connect to your existing blockchain wallet and directly stake tokens in them.
                </p>
                <div
                    style={{
                        width: '80%',
                        margin: 'auto',
                        marginTop: '40px'
                    }}
                >
                    <Button
                        clickFunction={handleClick}
                        type={'function'}
                        text={text}
                        style={style.button}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ConnectWalletModal