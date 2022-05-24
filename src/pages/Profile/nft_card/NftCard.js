import { useEffect, useState } from "react"
import { queryNftInfoById } from "../../../anonejs/queryInfo"
import axios from "axios"
import { Image, Skeleton } from "antd"
import noImg from '../../../assets/img/no_image.png'
import an1Logo from '../../../assets/img/another1_logo.png'
import { getListPrice } from "../../../utils/nft/queryNft"

const style = {
    card: {
        backgroundColor: '#000000',
        padding: 0,
        borderRadius: '10px',
        border: 0,
        overflow: 'hidden',
        aspectRatio: '1/1.3'
    },
    cardText: {
        textAlign: 'left',
        color: '#ffffff',
        padding: '1em',
        display: 'flex',
        justifyContent: 'space-between',
    },
    imge: {
        aspectRatio: '1/1'
    },
}

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}


const NftCard = ({ nft, contractAddr }) => {
    const [nftObj, setNftObj] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await queryNftInfoById({
                cw721ContractAddr: contractAddr,
                tokenId: nft.token_id
            })
            const { data } = await axios.get(`https://ipfs.io/ipfs/${nft.token_uri.split('ipfs://')[1]}`);
            const listPrice = await getListPrice(res.contract_addr, nft.token_id)
            const nftInfo = {
                ...res,
                metaData: data,
                listPrice
            }
            setNftObj(JSON.stringify(nftInfo))
            setLoading(false)
        })()
    }, [nft])

    return (
        <div
            className="card"
            style={style.card}
        >
            {
                !loading && nftObj !== '' && (
                    <a
                        href={`${process.env.REACT_APP_HOST}/nft/${nft.token_id}/${contractAddr}`}
                    >
                        <div>
                            <Image
                                src={`https://ipfs.io/ipfs/${JSON.parse(nftObj).metaData.image.split('ipfs://')[1]}`}
                                preview={false}
                                width={'100%'}
                                style={style.imge}
                                fallback={noImg}
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
                                {JSON.parse(nftObj).metaData.name} #{zeroPad(nft.token_id)}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                }}
                            >
                                <Image
                                    src={an1Logo}
                                    preview={false}
                                    width={'30px'}
                                    style={{
                                        borderRadius: '40%',
                                        position: 'relative',
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: '24px',
                                        color: '#00FFA3',
                                        marginBottom: 0,
                                        marginLeft: '10px'
                                    }}
                                >
                                    {JSON.parse(nftObj).listPrice} AN1
                                </p>
                            </div>
                        </div>
                    </a>
                )
            }
        </div>
    )
}

export default NftCard