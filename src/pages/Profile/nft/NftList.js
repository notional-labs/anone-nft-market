import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import Button from "../../../components/buttons/Button"
import { fetchDummyTopNft } from "../../../utils/fetch"
import { Link } from "react-router-dom"
import { queryAllDataOfAllNfts } from "../../../anonejs/queryInfo"
import './NftList.css'

const style = {
    title: {
        fontSize: '62px',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        padding: '0em 1em'
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
    imge: {
        transform: 'scaleX(-1) rotate(20deg)',
    },
}

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}

const NftList = ({ info, id }) => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const res = fetchDummyTopNft()
        queryAllDataOfAllNfts('one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq').then(result => console.log(result)).catch(e => console.log(e.message))
        if (Array.isArray(res) && res.length > 0) {
            setNfts([...res])
        }
    }, [])

    const handleClickBuy = () => {

    }

    const getNftList = () => {
        let list = []
        nfts.forEach(nft => {
            const jsx = (
                <div
                    className="card"
                    style={style.card}
                >
                    <a
                        href={`${process.env.REACT_APP_HOST}/nft/${nft.id}`}
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
                                width={'90%'}
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
                            <p
                                style={{
                                    fontSize: '24px',
                                    color: '#00FFA3',
                                    marginBottom: 0
                                }}
                            >
                                {nft.price} AN1
                            </p>
                        </div>
                    </a>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div>
            <Grid
                lists={getNftList()}
                numberOfColumn={3}
                rowGap={30}
                colGap={50}
            />
        </div>
    )
}

export default NftList