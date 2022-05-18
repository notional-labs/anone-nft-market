import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import Button from "../../../components/buttons/Button"
import { fetchDummyTopNft } from "../../../utils/fetch"
import { Link } from "react-router-dom"
import { queryAllDataOfAllNfts, } from "../../../anonejs/queryInfo"
import './NftList.css'
import NftCard from "../nft_card/NftCard"

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