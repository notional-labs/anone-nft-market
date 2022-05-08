import Button from "../../components/buttons/Button"
import keplrImg from '../../assets/img/keplr.png'
import { dummyConnectWallet } from "../../utils/getKeplr"
import { openNotification } from "../../components/notifications/notification"
import './Index.css'
import { Image } from "antd"

const buttonText = (
    <div
        style={{
            display: 'flex',
            justifyContent: 'start'
        }}
    >
        <Image
            src={keplrImg}
            preview={false}
            width={50}
        />
        <p
            style={{
                color: '#000000',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: 0,
                marginLeft: '20px',
                position: 'relative',
                top: '10px'
            }}
        >
            Keplr
        </p>
    </div>
)

const ConnectWalletPage = ({ wrapSetAccount }) => {

    const handleClick = () => {
        dummyConnectWallet().then(() => {
            wrapSetAccount(localStorage.getItem('account'))
            openNotification('success', 'Connect successfully')
        }).catch(e => {
            openNotification('error', e.message)
        })
    }

    return (
        <div
            style={{
                backgroundColor: '#000000',
                borderRadius: '10px',
                padding: '2em 5em'
            }}
        >
            <p
                style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#00FFA3',
                    margin: 0
                }}
            >
                Connect your wallet
            </p>
            <p>
                You need to connect a wallet to continue!
            </p>
            <div>
                <Button
                    type={'function'}
                    text={buttonText}
                    clickFunction={handleClick}
                    style={{
                        border: 0,
                        width: '100%',
                        cursor: 'pointer',
                        padding: '1em',
                        borderRadius: '10px',
                        marginTop: '50px'
                    }}
                    className='hover-connect-button'
                />
            </div>
        </div>
    )
}

export default ConnectWalletPage