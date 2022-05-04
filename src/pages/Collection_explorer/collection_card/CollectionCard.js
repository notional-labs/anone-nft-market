import { useState, useEffect } from "react"
import { queryCollectionInfo } from "../../../anonejs/queryInfo"
import { Image, Skeleton } from "antd"
import { getDataFromUri } from "../../../anonejs/getDataFromUri"
import tick from '../../../assets/img/verified.png'

const CollectionCard = ({ addr, selected }) => {
    const [collection, setCollection] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await queryCollectionInfo(addr)
            const res2 = await getDataFromUri(res.image)
            setCollection(JSON.stringify(res))
            setLoading(false)
        })()
    }, [])

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                textAlign: 'center',
                padding: '2em'
            }}
        >
            {
                loading ? (
                    <div>
                        <Skeleton.Avatar
                            size={'large'}
                        />
                        <Skeleton
                            active
                            paragraph={{ rows: 1 }}
                        />
                    </div>
                ) : collection !== '' && (
                    <>
                        <Image
                            src={JSON.parse(collection).image}
                            preview={false}
                            width={'20px'}
                            style={{
                                borderRadius: '50%',
                            }}
                        />
                        <p
                            style={{
                                marginLeft: '20px',
                                margin: 0
                            }}
                        >
                            {JSON.parse(collection).name}
                        </p>
                        <p
                            style={{
                                marginLeft: '16px'
                            }}
                        >
                            {JSON.parse(collection).description}
                        </p>
                    </>
                )
            }
        </div>
    )
}

export default CollectionCard