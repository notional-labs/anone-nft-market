import Button from "../../../components/buttons/Button"
import ConnectWalletModal from "../../../components/modal/ConnectWalletModal"
import { Image } from "antd"
import walletImg from '../../../assets/img/wallet.png'
import { useCallback, useState } from "react"

const style = {
    button: {
        backgroundColor: '#00FFA3',
        borderRadius: '7px',
        color: 'black',
        padding: '0.2em 1em',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
}

const text = (
    <p style={{
        margin: 0,
        zIndex: 1,
        position: 'relative',
    }}>
        <Image
            src={walletImg}
            preview={false}
            width={25}
        />
        <span
            style={{
                marginLeft: '10px',
                position: 'relative',
                top: '2px'
            }}>
            Connect Wallet
        </span>
    </p>
)

const ConnectButton = ({ wrapSetAccount }) => {
    const [showModal, setShowModal] = useState(false)

    const wrapSetShow = useCallback((value) => {
        setShowModal(value)
    }, [setShowModal])

    const handleClick = () => {
        setShowModal(true)
    }

    return (
        <div style={{
            padding: '2em 3em'
        }}>
            <Button
                style={style.button}
                text={text}
                type={'function'}
                clickFunction={handleClick}
            />
            <ConnectWalletModal
                show={showModal}
                wrapSetShow={wrapSetShow}
                wrapSetAccount={wrapSetAccount}
            />
        </div>
    )
}

export default ConnectButton