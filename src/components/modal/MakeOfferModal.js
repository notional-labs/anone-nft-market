import { Modal, Image, InputNumber, Select } from "antd"
import Button from "../buttons/Button"
import { dummyConnectWallet } from "../../utils/getKeplr"
import keplrLogo from '../../assets/img/keplr.png'
import { openNotification, openLoadingNotification } from '../notifications/notification'
import { useEffect, useState } from "react"
import { createSale } from "../../anonejs/createSale"
import { zeroPad } from "../../utils/format"
import { getBalance } from "../../utils/user/getBalance"

const style = {
    button: {
        backgroundColor: '#00FFA3',
        color: '#000000',
        padding: '.5em 1em',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '20px',
        borderRadius: '10px'
    }
}

const MakeOfferModal = ({ nft, show, wrapSetShow }) => {
    const [price, setPrice] = useState(0)
    const [rate, setRate] = useState(0)

    useEffect(() => {
        setRate(0.05)
    }, [])

    const handleClick = () => {
        openLoadingNotification('open')
        const config = {
            cw721ContractAddr: nft.contract_addr,
            token_id: nft.token_id,
            nftMarketplaceContractAddr:
                "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
            msgListingPrice: {
                list_price: `${price * 1000000}`
            },
        }
        createSale(config).then(() => {
            openLoadingNotification('close')
            wrapSetShow(false)
            openNotification('success', 'Transfer successfully')
        }).catch(e => {
            openLoadingNotification('close')
            wrapSetShow(false)
            openNotification('error', e.message)
            console.log(e.message)
        })
    }

    const handelClose = () => {
        wrapSetShow(false)
    }

    const handleChange = (value) => {
        setPrice(value)
    }

    return (
        <div>
            <Modal
                visible={show}
                footer={null}
                closable={false}
                onCancel={handelClose}
                style={{
                    padding: '2em',
                    color: '#ffffff'
                }}
            >

                <div
                    style={{
                        width: '90%',
                        margin: 'auto',
                        textAlign: 'center',
                        marginBottom: '10px'
                    }}
                >
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#00FFA3'
                        }}
                    >
                        List item for sale
                    </p>
                    <Image
                        src={`https://ipfs.io/ipfs/${nft.metaData.image.split('ipfs://')[1]}`}
                        width={'80%'}
                        style={{
                            aspectRatio: '1/1',
                            borderRadius: '10px'
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '80%',
                            margin: 'auto',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '20px',
                                color: '#00FFA3',
                                margin: 0
                            }}
                        >
                            {nft.metaData.name} #{zeroPad(nft.token_id)}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontSize: '20px',
                            }}
                        >
                            <p
                                style={{
                                    marginBottom: 0,
                                    marginRight: '10px',
                                }}
                            >
                                Price:
                            </p>
                            <p
                                style={{
                                    color: '#00FFA3',
                                    marginBottom: 0
                                }}
                            >
                                {(price || 0).toFixed(2)} AN1
                            </p>
                        </div>
                    </div>
                    <div>
                        <p
                            style={{
                                textAlign: 'left',
                                margin: 0
                            }}
                        >
                            Price (AN1)
                        </p>
                        <div>
                            <InputNumber
                                style={{
                                    width: '100%',
                                    fontSize: '20px',
                                    padding: '.5em'
                                }}
                                onChange={handleChange}
                                controls={false}
                                placeholder='Amount'
                            />
                        </div>
                    </div>
                    <Button
                        clickFunction={handleClick}
                        type={'function'}
                        text={'Complete listing'}
                        style={style.button}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default MakeOfferModal