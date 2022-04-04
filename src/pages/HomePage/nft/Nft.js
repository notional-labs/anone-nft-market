import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyTopNft } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import './Nft.css'

const style = {
    title: {
        fontSize: '62px',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    container: {
        marginTop: '10em'
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
        padding: '2em 20em'
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
        transform: 'scaleX(-1) rotate(20deg)',
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

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}



const Nft = ({ }) => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const res = fetchDummyTopNft()
        if (Array.isArray(res) && res.length > 0) {
            setNfts([...res])
        }
    }, [])

    const handleClick = () => {

    }

    const handleClickBuy = () => {

    }

    const getNftList = () => {
        let list = []
        const viewNft = nfts.slice(0, 8)
        viewNft.forEach(nft => {
            const jsx = (
                <div
                    style={style.card}
                >
                    <div
                        style={{
                            padding: '2em',
                            paddingBottom: '5em'
                        }}
                    >
                        <Image
                            src={nft.img}
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
                            Sneaker #{zeroPad(nft.id)}
                        </p>
                        <p>
                            {nft.quantity}/100
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
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div
            style={style.container}
        >
            <div
                style={style.title}
            >
                <span
                    style={{
                        marginRight: '20px'
                    }}
                >
                    TOP
                </span>
                <span
                    style={{
                        color: '#00FFA3'
                    }}
                >
                    NFT
                </span>
            </div>

            <div
                style={style.grid}
            >
                <Grid
                    lists={getNftList()}
                    numberOfColumn={4}
                    rowGap={35}
                    colGap={50}
                />
            </div>
            <div
                style={style.buttonContainer}
            >
                <Button
                    clickFunction={handleClick}
                    text={'View more...'}
                    style={style.viewMoreButton}
                    type={'function'}
                />
            </div>
        </div>
    )
}

export default Nft