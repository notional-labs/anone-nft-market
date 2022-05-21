import { Modal } from "antd"
import { burnNft } from "../../anonejs/burnNft"
import { openNotification } from "../notifications/notification"

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


const BurnModal = ({ nft, show, wrapSetShow }) => {

    const handleClick = () => {
        const config = {
            cw721ContractAddr: nft.contractAddr,
            tokenId: nft.tokenId
        }
        burnNft(config).then(() => {
            wrapSetShow(false)
            openNotification('success', 'Burn successfully')
        }).catch(e => {
            wrapSetShow(false)
            openNotification('error', e.message)
        })
    }

    const handelClose = () => {
        wrapSetShow(false)
    }

    return (
        <div>
            <Modal
                visible={show}
                footer={null}
                closable={false}
                onCancel={handelClose}
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
                    Burn NFT
                </p>
                <p
                    style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'red',
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}
                >
                    Burn NFT will delete it permanently
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
                        text={'Burn'}
                        style={style.button}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default BurnModal