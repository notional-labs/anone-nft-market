import Header from "../header/Header"
import Footer from "../footer/Footer"
import ImgAndSpec from "./img_and_specs/ImgAndSpec"
import Description from "./description/Description"
import { getNftById } from "../../utils/api/nft"
import { queryNftInfoById, queryAllDataOfAllModels, queryCollectionAddressOfLaunchpad } from "../../anonejs/queryInfo"
import { useEffect, useState } from "react"
import { getDataFromUri } from "../../anonejs/getDataFromUri"
import { useParams } from "react-router-dom";
import axios from "axios"

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    },
}

const NftProfile = ({ account, wrapSetAccount }) => {
    const [nft, setNft] = useState('')
    let { id, contract } = useParams()

    useEffect(() => {
        (async () => {
            const res = await queryNftInfoById({
                cw721ContractAddr: contract,
                tokenId: id
            })
            const { data } = await axios.get(`https://ipfs.io/ipfs/${res.token_uri.split('ipfs://')[1]}`);
            console.log(
                {
                    ...res,
                    metaData: data
                }
            )
            setNft(JSON.stringify( {
                ...res,
                metaData: data
            }))
        })()
    }, [])

    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            {
                nft !== '' && (
                    <div
                        style={{
                            marginTop: '90px'
                        }}
                    >
                        <ImgAndSpec
                            nft={JSON.parse(nft)}
                        />
                        <Description
                            nft={JSON.parse(nft)}
                        />
                    </div>
                )
            }
            <Footer />
        </div >
    )
}

export default NftProfile