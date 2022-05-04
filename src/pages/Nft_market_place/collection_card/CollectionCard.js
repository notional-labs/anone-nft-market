import { useState, useEffect } from "react"
import { queryCollectionInfo } from "../../../anonejs/queryInfo"
import { Image } from "antd"
import { getDataFromUri } from "../../../anonejs/getDataFromUri"
import tick from '../../../assets/img/verified.png'

const CollectionCard = ({ addr, selected }) => {
    const [collection, setCollection] = useState('')

    useEffect(() => {
        (async () => {
            const res = await queryCollectionInfo(addr)
            const res2 = await getDataFromUri(res.image)
            setCollection(JSON.stringify(res))
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
                        {
                            selected ? (
                                <Image
                                    src={tick}
                                    preview={false}
                                    width={'20px'}
                                    style={{
                                        borderRadius: '50%',
                                    }}
                                />
                            ) : (
                                <Image
                                    src={JSON.parse(collection).image}
                                    preview={false}
                                    width={'20px'}
                                    style={{
                                        borderRadius: '50%',
                                    }}
                                />
                            )
                        }
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