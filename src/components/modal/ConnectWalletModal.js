import { Modal, Image } from "antd"
import { wrap } from "lodash"
import Button from "../buttons/Button"
import { dummyConnectWallet } from "../../utils/getKeplr"
import keplrLogo from '../../assets/img/keplr.png'

const style = {
    button: {
        border: 'solid 1px #00FFA3',
        backgroundColor: 'transparent',
        color: '#ffffff'
    }
}

const text = (
    <div>
        <Image
            src={keplrLogo}
            preview={false}
            width={50}
        />
        <span
            style={{
                fontSize: '24px',
                fontWeight: 'bold'
            }}
        >
            Keplr
        </span>
    </div>
)

const ConnectWalletModal = ({ show, wrapSetShow }) => {


    const handleClick = () => {
        dummyConnectWallet().then(() => {
            wrapSetShow(false)
        }).catch(e => console.log(e))
    }

    return (
        <div>
            <Modal
                visible={show}
                footer={null}
                closable={false}
            >
                <p>
                    You'll need a wallet on Anther-1 to continue
                </p>
                <hr />
                <p>
                    Safely connect to your existing blockchain wallet and directly stake tokens in them.
                </p>
                <div>
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