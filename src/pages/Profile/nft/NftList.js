import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import Button from "../../../components/buttons/Button"
import { Link } from "react-router-dom"
import { queryAllDataOfAllNfts, } from "../../../anonejs/queryInfo"
import noItem from '../../../assets/img/no_item.png'
import './NftList.css'
import NftCard from "../nft_card/NftCard"
import loadingGif from '../../../assets/img/another.gif'


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

const NftList = ({ info, id, type }) => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (type === 'collection') {
                const { all_tokens_info } = await queryAllDataOfAllNfts(JSON.parse(info).contractAddr)
                setNfts([...all_tokens_info])
                setLoading(false)
            }
        })()
    }, [])

    const handleClickBuy = () => {

    }

    const getNftList = () => {
        let list = []
        nfts.forEach(nft => {
            const jsx = (
                <NftCard
                    nft={nft}
                    contractAddr={JSON.parse(info).contractAddr}
                />
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div>
            {
                loading ? (
                    <div
                        style={{
                            color: '#ffffff',
                            fontSize: '3rem',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: '1em',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                src={loadingGif}
                                preview={false}
                                width={'200px'}
                            />
                        </div>
                    </div>
                ) : nfts.length > 0 ? (
                    <Grid
                        lists={getNftList()}
                        numberOfColumn={3}
                        rowGap={30}
                        colGap={50}
                    />
                ) : (
                    <div
                        style={{
                            color: '#ffffff',
                            fontSize: '3rem',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '2em'
                        }}
                    >
                        <div>
                            <Image
                                src={noItem}
                                preview={false}
                                width={'20%'}
                                style={{
                                    opacity: 0.6
                                }}
                            />
                        </div>
                        <p
                            style={{
                                marginBottom: 0,
                                marginTop: '1em'
                            }}
                        >
                            NO ITEMS FOUND
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default NftList