import { useState, useEffect } from "react"
import { queryCollectionInfo, queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo"
import { Image, Skeleton } from "antd"
import { getDataFromUri } from "../../../anonejs/getDataFromUri"
import noImg from '../../../assets/img/no_image.png'

const CollectionCard = ({ addr }) => {
    const [collection, setCollection] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const contractAddr = await queryCollectionAddressOfLaunchpad(addr)
            const res = await queryCollectionInfo(contractAddr)
            setCollection(JSON.stringify(res))
            setLoading(false)
        })()
    }, [addr])

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
                loading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}
                    >
                        <Skeleton.Avatar
                            size={'default'}
                        />
                        <div
                            style={{
                                marginLeft: '20px'
                            }}
                        >
                            <Skeleton.Input
                                active
                                size='small'
                            />
                        </div>
                    </div>
                ) : collection !== '' && (
                    <>
                        <Image
                            src={`https://ipfs.io/ipfs/${JSON.parse(collection).image.split('ipfs://')[1]}`}
                            preview={false}
                            width={'30px'}
                            style={{
                                borderRadius: '50%',
                                aspectRatio: '1/1'
                            }}
                            fallback={noImg}
                        />
                        <p
                            style={{
                                marginLeft: '20px'
                            }}
                        >
                            {JSON.parse(collection).name}
                        </p>
                    </>
                )
            }
        </div>
    )
}

export default CollectionCard