import Header from "../header/Header"
import Footer from "../footer/Footer"
import ImgAndSpec from "./img_and_specs/ImgAndSpec"
import { getNftById } from "../../utils/api/nft"
import { useEffect, useState } from "react"

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    },
}

const NftProfile = ({ account, wrapSetAccount }) => {
    const [nft, setNft] = useState(null)

    useEffect(() => {
        const res = getNftById()
        setNft(JSON.stringify(res))
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
                    <ImgAndSpec
                        nft={nft}
                    />
                )
            }
            <Footer />
        </div >
    )
}

export default NftProfile