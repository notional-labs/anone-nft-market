import { Modal, Image, InputNumber } from "antd"
import Button from "../buttons/Button"
import { openNotification, openLoadingNotification } from '../notifications/notification'
import { useEffect, useState } from "react"
import { makeOrder } from "../../anonejs/makeOrder"
import { zeroPad } from "../../utils/format"

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

const BuyModal = ({ nft, show, wrapSetShow }) => {
    const handleClick = () => {
        openLoadingNotification('open')
        const config = {
            nftMarketplaceContractAddr: process.env.REACT_APP_MARKETPLACE_ADDRESS,
            offering_id: nft.id,
            funds: [{ denom: "uan1", amount: nft.list_price }],
        };
        makeOrder(config).then(() => {
            openLoadingNotification('close')
            wrapSetShow(false)
            openNotification('success', 'Buy successfully')
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

    return (
        <div>
            <Modal
                visible={show}
                footer={null}
                closable={false}
                onCancel={handelClose}
                style={{
                    padding: '1em',
                    color: '#ffffff'
                }}
            >

                <div
                    style={{
                        width: '100%',
                        margin: 'auto',
                        textAlign: 'center',
                        marginBottom: '10px'
                    }}
                >
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#00FFA3',
                        }}
                    >
                        Buy this NFT
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            border: 'solid 1px #00FFA3',
                            padding: '1em',
                            borderRadius: '10px'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                
                            }}
                        >
                            <Image
                                src={`https://ipfs.io/ipfs/${nft.metaData.image.split('ipfs://')[1]}`}
                                width={'70px'}
                                style={{
                                    aspectRatio: '1/1',
                                    borderRadius: '10px'
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '20px',
                                    color: '#00FFA3',
                                    marginLeft: '20px'
                                }}
                            >
                                {nft.metaData.name} #{zeroPad(nft.token_id)}
                            </p>
                        </div>
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
                                {(parseFloat(nft.list_price) / 1000000).toFixed(2)} AN1
                            </p>
                        </div>
                    </div>
                    <Button
                        clickFunction={handleClick}
                        type={'function'}
                        text={'Checkout'}
                        style={style.button}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default BuyModal