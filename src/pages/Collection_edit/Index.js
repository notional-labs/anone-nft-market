import Header from "../header/Header"
import Footer from "../footer/Footer"
import Forms from "./form/Forms"
import { useEffect, useState } from "react"
import { queryCollectionInfo, queryCollectionAddressOfLaunchpad } from "../../anonejs/queryInfo"
import { useParams } from "react-router-dom"

const style = {
    container: {
        color: '#F2F1F1',
        position: 'relative',
        zIndex: 0
    },
}

const CollectionEdit = ({ account, wrapSetAccount }) => {
    const [collection, setCollection] = useState('')
    const [loading, setLoading] = useState(false)
    let { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoading(true)
            const contractAddr = await queryCollectionAddressOfLaunchpad(id)
            const res = await queryCollectionInfo(contractAddr)
            const collectionObj = {
                ...res,
                contractAddr
            }
            setCollection(JSON.stringify(collectionObj))
            setLoading(false)
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
                collection !== '' && (
                    <Forms
                        account={account}
                        collection={JSON.parse(collection)}
                    />
                )
            }
        </div>
    )
}

export default CollectionEdit