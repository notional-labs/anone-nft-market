import { Image } from "antd"
import Contact from "../contact/Contact"
import verifiedImg from '../../../assets/img/verified.png'

const Banner = ({ user }) => {
    return (
        <div>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${JSON.parse(user).user.banner_img})`,
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
                        src={JSON.parse(user).user.avt}
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
                        {JSON.parse(user).user.userName}
                        <Image
                            src={verifiedImg}
                            preview={false}
                            width={'30px'}
                            style={{
                                marginLeft: '30px'
                            }}
                        />
                    </p>
                    <p
                        style={{
                            color: '#00FFA3',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            position: 'relative',
                            top: '-50px',
                            margin: 0
                        }}
                    >
                        {JSON.parse(user).account.address}
                    </p>
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
                        {JSON.parse(user).user.description}
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
                <Contact />
            </div>
        </div>
    )
}

export default Banner