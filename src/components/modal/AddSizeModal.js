import { Modal, Image, Input } from "antd"
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
        <span
            style={{
                fontSize: '24px',
                fontWeight: 'bold',
                position: 'relative',
                top: '5px'
            }}
        >
            Add
        </span>
    </div>
)

const AddSizeModal = ({ show, wrapSetShow, wrapSetSize }) => {


    const handleClick = (value) => {
        wrapSetSize(value)
        wrapSetShow(false)
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
                    You'll need a wallet on Anther-1 to continue
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

export default AddSizeModal