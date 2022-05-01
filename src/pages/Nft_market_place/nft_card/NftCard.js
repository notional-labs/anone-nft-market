import { Image, Skeleton } from "antd";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";
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
        backgroundColor: 'transparent',
        border: 'solid 1px #00FFA3',
        padding: '1em'
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
        color: '#ffffff'
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

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await getInfo(offerObject)
                console.log(res)
                setNft(JSON.stringify(res))
                setLoading(false)
            }
            catch (e) {
                console.log(e)
            }
        })()
    }, [])

    const handleClick = () => {

    }

    const handleClickBuy = () => {

    }

    return (
        <div
            style={style.card}
        >
            {
                !loading && nft !== '' ? (
                    <div>
                        <div
                            style={{
                                padding: '2em',
                                paddingBottom: '5em'
                            }}
                        >
                           <Image
                                src={JSON.parse(nft).data && JSON.parse(nft).data.image}
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
                                    margin: 0
                                }}
                            >
                                Sneaker #{zeroPad(JSON.parse(nft).token_id)}
                            </p>
                            <p>
                                {parseInt(JSON.parse(nft).list_price) / 1000000} AN1
                            </p>
                        </div>
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
                    </div>
                ) : (
                    <div
                        style={{
                            width: '100%'
                        }}
                    >
                        <Skeleton/>
                    </div>
                )
            }
        </div>
    )
}

export default NftCard