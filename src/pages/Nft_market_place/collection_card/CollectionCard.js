import { useState, useEffect, } from "react"
import { queryCollectionInfo } from "../../../anonejs/queryInfo"
import { Image, Skeleton } from "antd"
import tick from '../../../assets/img/verified.png'
import noImg from '../../../assets/img/no_image.png'

const CollectionCard = ({ addr, selected,}) => {
    const [collection, setCollection] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
                setLoading(true)
                const res = await queryCollectionInfo(addr)
                setCollection(JSON.stringify(res))
                setLoading(false)
        })()
    }, [addr, ])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'start',
                position: 'relative',
                fontSize: '20px',
                marginTop: '10px'
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
                        {
                            selected ? (
                                <Image
                                    src={tick}
                                    preview={false}
                                    width={'30px'}
                                    style={{
                                        borderRadius: '50%',
                                        width: '30px',
                                    }}
                                />
                            ) : (
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
                            )
                        }
                        <p
                            style={{
                                marginLeft: '20px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
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