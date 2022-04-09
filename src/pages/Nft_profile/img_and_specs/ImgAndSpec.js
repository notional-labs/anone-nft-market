import { Image, Typography } from "antd"
import { dummyGetUserById } from "../../../utils/api/user";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const { Paragraph } = Typography;

const style = {
    imgAndSpec: {
        display: 'flex',
        justifyContent: 'start',
    }
}

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}

const ImgAndSpec = ({ nft }) => {
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        const res = dummyGetUserById(2)
        setOwner(`${JSON.stringify(res)}`)
    }, [])

    return (
        <div
            style={{
                margin: '10em auto',
                width: '60%'
            }}
        >
            <div
                style={style.imgAndSpec}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '10em',
                        width: '50%'
                    }}
                >
                    <Image
                        src={JSON.parse(nft).img}
                        preview={false}
                        width={'100%'}
                        style={{
                            position: 'relative',

                        }}
                    />
                </div>
                <div
                    style={{
                        marginLeft: '50px'
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: '#00FFA3',
                            }}
                        >
                            Sneaker #{zeroPad(JSON.parse(nft).id)}
                        </p>
                    </div>
                    {
                        owner !== null && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#00FFA3'
                                    }}
                                >
                                    Owned by
                                    <span
                                        style={{
                                            color: '#00FFA3',
                                            marginLeft: '10px'
                                        }}
                                    >
                                        <Link
                                            to={`/profile/${JSON.parse(owner).id}`}
                                        >
                                            {JSON.parse(owner).userName}
                                        </Link>
                                    </span>
                                </p>
                                <span
                                    style={{
                                        marginLeft: '30px',
                                        fontSize: '16px',
                                        position: 'relative',
                                        top: '5px'
                                    }}
                                >
                                    <Paragraph 
                                        copyable={{ text: JSON.parse(owner).addr }} 
                                        style={{
                                            color: '#ffffff',
                                            marginBottom: 0,
                                        }}
                                    >
                                        {JSON.parse(owner).addr}
                                    </Paragraph>
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ImgAndSpec