import { useState, useEffect } from "react"
import { queryCollectionInfo, queryCollectionAddressOfLaunchpad, queryModelInfoById } from "../../../anonejs/queryInfo"
import { Image, Skeleton } from "antd"
import { getDataFromUri } from "../../../anonejs/getDataFromUri"
import noImg from '../../../assets/img/no_image.png'
import axios from "axios"

const Card = ({ addr, type, model = null }) => {
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (type === 'collection') {
                const contractAddr = await queryCollectionAddressOfLaunchpad(addr)
                const res = await queryCollectionInfo(contractAddr)
                setInfo(JSON.stringify(res))
                setLoading(false)
            }
            else {
                const metaData = await axios.get(`https://ipfs.io/ipfs/${model.model_uri.split('ipfs://')[1]}`)
                setInfo(JSON.stringify(metaData.data))
                setLoading(false)
            }
        })()
    }, [type])

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
                ) : info !== '' && (
                    <>
                        <Image
                            src={JSON.parse(info).image ? `https://ipfs.io/ipfs/${JSON.parse(info).image.split('ipfs://')[1]}` : noImg }
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
                            {JSON.parse(info).name ? JSON.parse(info).name : 'no name'}
                        </p>
                    </>
                )
            }
        </div>
    )
}

export default Card