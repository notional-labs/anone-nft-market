import Header from "../header/Header"
import Footer from "../footer/Footer"
import ImgAndSpec from "./img_and_specs/ImgAndSpec"
import Description from "./description/Description"
import { getNftById } from "../../utils/api/nft"
import { queryNftInfoById, queryAllDataOfAllModels } from "../../anonejs/queryInfo"
import { useEffect, useState } from "react"
import { getDataFromUri } from "../../anonejs/getDataFromUri"

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    },
}

const NftProfile = ({ account, wrapSetAccount }) => {
    const [nft, setNft] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await queryNftInfoById({
                cw721ContractAddr:
                    "one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0",
                tokenId: '2'
            })
            const res2 = await queryAllDataOfAllModels({
                cw721ContractAddr:
                    "one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0",
                modelId: '1'
            })
            console.log(res2)
        })()
        // setNft(JSON.stringify(res))
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
                nft !== null && (
                    <div
                        style={{
                            marginTop: '90px'
                        }}
                    >
                        <ImgAndSpec
                            nft={nft}
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