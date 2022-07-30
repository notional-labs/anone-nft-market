import { useState, useEffect } from "react"
import { queryCollectionInfo, queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo"
import { Image, Skeleton } from "antd"
import { getDataFromUri, } from "../../../anonejs/getDataFromUri"
import noImg from '../../../assets/img/no_image.png'
import './CollectionCard.css'

const CollectionCard = ({ addr, }) => {
    const [collection, setCollection] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const contractAddr = await queryCollectionAddressOfLaunchpad(addr)
            const res = await queryCollectionInfo(contractAddr)
            console.log(res)
            setCollection(JSON.stringify(res))
            setLoading(false)
        })()
    }, [addr])

    return (
        <a
            href={`${process.env.REACT_APP_HOST}/collection/${addr}`}
            style={{
                color: '#000000',
                padding: '1em',
            }}
            className='hover-card'
        >
            <div
                style={{
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    height: '350px',
                    padding: '1em'
                }}
            >
                {
                    loading ? (
                        <>
                            <div
                                style={{
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    height: '150px',
                                    backgroundColor: '#c9c9c9',
                                    borderRadius: '10px',
                                    boxShadow: 'inset 0 0 10px #7d7d7d'
                                }}
                            />
                            <div
                                style={{
                                    padding: '2em',
                                    position: 'relative',
                                    top: '-50px'
                                }}
                            >
                                <Skeleton.Avatar
                                    size={'large'}
                                />
                                <Skeleton
                                    active
                                    paragraph={{ rows: 1 }}
                                />
                            </div>
                        </>
                    ) : collection !== '' && (
                        <>
                            <div
                                style={{
                                    backgroundImage: `url(${JSON.parse(collection).banner_img})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    height: '150px',
                                    backgroundColor: '#c9c9c9',
                                    borderRadius: '10px',
                                    boxShadow: 'inset 0 0 10px #7d7d7d'
                                }}
                            />
                            <Image
                                src={`https://ipfs.io/ipfs/${JSON.parse(collection).image.split('ipfs://')[1]}`}
                                preview={false}
                                width={'70px'}
                                style={{
                                    borderRadius: '50%',
                                    aspectRatio: '1/1',
                                    position: 'relative',
                                    top: '-35px',
                                    border: 'solid 1px white'
                                }}
                                fallback={noImg}
                            />
                            <div
                                style={{
                                    position: 'relative',
                                    top: '-20px'
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '20px',
                                        margin: 0,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {JSON.parse(collection).name}
                                </p>
                                <p
                                    style={{
                                        fontSize: '16px'
                                    }}
                                >
                                    {JSON.parse(collection).description}
                                </p>
                            </div>
                        </>
                    )
                }
            </div>
        </a>
    )
}

export default CollectionCard