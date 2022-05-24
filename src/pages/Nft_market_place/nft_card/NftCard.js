import { Image, Skeleton } from "antd";
import { useEffect, useState, useRef, useCallback } from "react";
import Button from "../../../components/buttons/Button";
import BuyModal from "../../../components/modal/BuyModal";
import { getInfo } from "../../../utils/nft/queryNft";

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}

const style = {
    title: {
        fontSize: '62px',
        textAlign: 'left',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        justifyContent: 'start',
    },
    card: {
        backgroundColor: '#000000',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    bannerCard: {
        padding: '0.8em',
    },
    avt: {
        position: 'relative',
        marginLeft: '40%',
        marginTop: '-13%'
    },
    grid: {

    },
    cardText: {
        textAlign: 'left',
        color: '#ffffff',
        padding: '0 1em'
    },
    button: {
        color: '#000000',
        fontSize: '20px',
        fontWeight: 700,
        backgroundColor: '#00FFA3',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto',
        textAlign: 'center',
        width: '100%'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2em'
    },
    imge: {
        aspectRatio: '1/1'
    },
    viewMoreButton: {
        color: '#00FFA3',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto 0'
    },
}


const NftCard = ({ offerObject }) => {
    const [nft, setNft] = useState('')
    const [loading, setLoading] = useState(false)
    const [showBuyModal, setShowBuyModal] = useState(false)
    const ref = useRef()

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await getInfo(offerObject)
                setNft(JSON.stringify(res))
                setLoading(false)
            }
            catch (e) {
                console.log(e)
            }
        })()
    }, [offerObject])

    const wrapSetBuyModal = useCallback((value) => {
        setShowBuyModal(value)
    }, [])

    const handleClickBuy = () => {
        setShowBuyModal(true)
    }

    return (
        <div
            style={style.card}
        >
            {
                !loading && nft !== '' ? (
                    <>
                        <a
                            href={`${process.env.REACT_APP_HOST}/nft/${offerObject.token_id}/${offerObject.contract_addr}`}
                        >
                            <div>
                                <div
                                >
                                    <Image
                                        src={`https://ipfs.io/ipfs/${JSON.parse(nft).metaData.image.split('ipfs://')[1]}`}
                                        preview={false}
                                        width={'100%'}
                                        style={style.imge}
                                    />
                                </div>
                                <div
                                    style={style.cardText}
                                >
                                    <p
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            margin: 0,
                                        }}
                                    >
                                        Sneaker #{zeroPad(JSON.parse(nft).token_id)}
                                    </p>
                                    <p>
                                        {parseInt(JSON.parse(nft).list_price) / 1000000} AN1
                                    </p>
                                </div>
                            </div>
                        </a>
                        <div
                            style={{
                                width: '100%'
                            }}
                        >
                            <Button
                                clickFunction={handleClickBuy}
                                style={style.button}
                                type={'function'}
                                text={'Buy'}
                                className={'buy-button'}
                            />
                        </div>
                        <BuyModal
                            nft={JSON.parse(nft)}
                            show={showBuyModal}
                            wrapSetShow={wrapSetBuyModal}
                        />
                    </>
                ) : (
                    <div
                        style={{
                            width: '100%',
                            padding: '1em'
                        }}
                    >
                        <Skeleton />
                    </div>
                )
            }
        </div>
    )
}

export default NftCard