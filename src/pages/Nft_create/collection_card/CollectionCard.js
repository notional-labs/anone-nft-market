import { useState, useEffect } from "react"
import { queryCollectionInfo } from "../../../anonejs/queryInfo"
import { Image } from "antd"
import { getDataFromUri } from "../../../anonejs/getDataFromUri"

const CollectionCard = ({ addr }) => {
    const [collection, setCollection] = useState('')

    useEffect(() => {
        (async () => {
            const res = await queryCollectionInfo(addr)
            const res2 = await getDataFromUri(res.image)
            setCollection(JSON.stringify(res))
            console.log(res2)
        })()
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'start',
                position: 'relative',
                fontSize: '20px',
            }}
        >
            {
                collection !== '' && (
                    <>
                        <Image
                            src={JSON.parse(collection).image}
                            preview={false}
                            width={'15%'}
                            style={{
                                borderRadius: '50%',
                            }}
                        />
                        <p>
                            {JSON.parse(collection).name}
                        </p>
                    </>
                )
            }
        </div>
    )
}

export default CollectionCard