import { Input, Modal } from "antd"
import { useState } from "react"
import { transferNft } from "../../anonejs/transferNft"

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


const TransferModal = ({ nft, show, wrapSetShow }) => {
    const [address, setAddress] = useState('')

    const handleClick = () => {
        const config = {
            cw721ContractAddr: nft.contractAddr,
            tokenId: nft.tokenId,
            recipient: address
        }
        transferNft(config).then(() => {
            wrapSetShow(false)
            openNotification('success', 'Transfer successfully')
        }).catch(e => {
            wrapSetShow(false)
            openNotification('error', e.message)
        })
    }

    const handelClose = () => {
        wrapSetShow(false)
    }

    const handleChange = (e) => {
        setAddress(e.target.value)
    }

    return (
        <div>
            <Modal
                visible={show}
                footer={null}
                closable={false}
                handelClose={handelClose}
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
                    Transfer NFT
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
                    Receiver address
                </p>
                <Input
                    style={{

                    }}
                    onChange={handleChange}
                />
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
                        text={'Transfer'}
                        style={style.button}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default TransferModal