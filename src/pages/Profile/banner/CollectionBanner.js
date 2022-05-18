import { Image } from "antd"
import Contact from "../contact/Contact"
import verifiedImg from '../../../assets/img/verified.png'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { dummyGetUserById } from "../../../utils/api/user"
import { queryAllDataOfAllNfts } from "../../../anonejs/queryInfo"

const CollectionBanner = ({ collection, type, id, account }) => {
    const [author, setAuthor] = useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(0)

    useEffect(() => {
        (async () => {
            if (type === 'collection') {
                const { all_tokens_info } = await queryAllDataOfAllNfts(JSON.parse(collection).contractAddr)
                setItems(all_tokens_info.length)
            }
        })()
    }, [])

    useEffect(() => {
        const res = dummyGetUserById(2)
        setAuthor(`${JSON.stringify(res)}`)
    }, [])

    return (
        <div>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${JSON.parse(collection).banner_img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '20vh',
                        backgroundColor: '#c9c9c9'
                    }}
                />
                <div
                    style={{
                        width: '100%',
                        margin: 'auto',
                        textAlign: 'center'
                    }}
                >
                    <Image
                        src={`https://ipfs.io/ipfs/${JSON.parse(collection).image.split('ipfs://')[1]}`}
                        preview={false}
                        width={'200px'}
                        style={{
                            borderRadius: '50%',
                            position: 'relative',
                            top: '-100px',
                            left: '10px',
                            border: 'solid 2px white',
                            aspectRatio: '1/1'
                        }}
                    />
                    <p
                        style={{
                            color: '#ffffff',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            position: 'relative',
                            top: '-50px',
                            margin: 0
                        }}
                    >
                        {
                            JSON.parse(collection).name
                        }
                        <Image
                            src={verifiedImg}
                            preview={false}
                            width={'30px'}
                            style={{
                                marginLeft: '30px'
                            }}
                        />
                    </p>
                    {
                        author !== null && (
                            <div
                                style={{
                                    color: '#ffffff',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    position: 'relative',
                                    top: '-50px',
                                    margin: 0
                                }}
                            >
                                Create by
                                <span
                                    style={{
                                        color: '#00FFA3',
                                        marginLeft: '10px'
                                    }}
                                >
                                    <Link
                                        to={`/profile/${JSON.parse(author).id}`}
                                    >
                                        {JSON.parse(author).userName}
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                    <p
                        style={{
                            color: '#ffffff',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            position: 'relative',
                            top: '-30px',
                            margin: 0
                        }}
                    >
                        {JSON.parse(collection).description}
                    </p>
                </div>
                <div
                    style={{
                        border: 'solid 1px #00FFA3',
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '30%',
                        margin: 'auto',
                        padding: '1em 0em',
                        color: '#ffffff',
                        textAlign: 'center'
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                margin: 0,
                            }}
                        >
                            {items}
                        </p>
                        <p
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            Items
                        </p>
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            999
                        </p>
                        <p
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            Owner
                        </p>
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            999
                        </p>
                        <p
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            floor price
                        </p>
                    </div>
                </div>
                <Contact
                    type={type}
                    info={collection}
                    id={id}
                    account={account}
                />
            </div>
        </div >
    )
}

export default CollectionBanner