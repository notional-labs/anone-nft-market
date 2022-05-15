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
    const [nft, setNft] = useState('')

    useEffect(() => {
        (async () => {
            const res = await queryNftInfoById({
                cw721ContractAddr:
                    "one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0",
                tokenId: '2'
            })
            console.log(res)
            const res2 = await getDataFromUri('https://ipfs.io/ipfs/bafybeiaivv62j7jxlkahxobfr5io7h2j56obw5mojljho2ybg7zhah2eue/galaxyfcnCU3/1');
            const data = {
                ...res,
                metaData: res2
            }
            setNft(JSON.stringify(data))
        })()
        // setNft(JSON.stringify(res))
    }, [])

    console.log(nft)

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