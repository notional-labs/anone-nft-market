import { useState, useEffect, } from "react"
import { queryCollectionInfo, queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo"
import { Image, Skeleton } from "antd"
import noImg from '../../../assets/img/no_image.png'

const style = {
    container: {
        borderRadius: '10px',
        backgroundColor: '#7B61FF',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'start',
        position: 'relative',
        fontSize: '20px',
        padding: '1em .5em'
    }
}

const CollectionFilterCard = ({ addr }) => {
    const [collection, setCollection] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const contractAddr = await queryCollectionAddressOfLaunchpad(addr)
            const res = await queryCollectionInfo(contractAddr)
            let collectionObj = {
                ...res,
                contractAddr: contractAddr
            }
            setCollection(JSON.stringify(collectionObj))
            setLoading(false)
        })()
    }, [addr])

    return (
        <div
            style={style.container}
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
                                width: '30px',
                                aspectRatio: '1/1'
                            }}
                            fallback={noImg}
                        />
                        <p
                            style={{
                                marginLeft: '20px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginBottom: 0
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

export default CollectionFilterCard