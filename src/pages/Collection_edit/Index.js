import Header from "../header/Header"
import Footer from "../footer/Footer"
import Forms from "./form/Forms"
import { useEffect, useState } from "react"
import { queryCollectionInfo } from "../../anonejs/queryInfo"
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
            const res = await queryCollectionInfo(id)
            setCollection(JSON.stringify(res))
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
                        contractAddr={id}
                    />
                )
            }
        </div>
    )
}

export default CollectionEdit