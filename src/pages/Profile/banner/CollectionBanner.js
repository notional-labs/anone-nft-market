import { Image } from "antd"
import Contact from "../contact/Contact"
import verifiedImg from '../../../assets/img/verified.png'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { dummyGetUserById } from "../../../utils/api/user"

const CollectionBanner = ({ user, type }) => {
    const [author, setAuthor] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (type === 'collection') {
            const res = dummyGetUserById(2)
            setAuthor(`${JSON.stringify(res)}`)
            setLoading(false)
        }
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
                        backgroundImage: `url(${JSON.parse(user).banner_img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '20vh'
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
                        src={
                            JSON.parse(user).avt
                        }
                        preview={false}
                        width={'200px'}
                        style={{
                            borderRadius: '50%',
                            position: 'relative',
                            top: '-100px',
                            left: '10px'
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
                            JSON.parse(user).title
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
                        {/* <span
                            style={{
                                color: '#00FFA3',
                                marginLeft: '20px'
                            }}
                        >
                            <Link
                                to={`/profile/${JSON.parse(author).id}`}
                            >
                                {JSON.parse(author).userName}
                            </Link>
                        </span> */}
                    </div>
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
                        {JSON.parse(user).description}
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
                            999
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
                />
            </div>
        </div >
    )
}

export default CollectionBanner