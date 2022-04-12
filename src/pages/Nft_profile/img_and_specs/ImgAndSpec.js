import { Image, Typography } from "antd"
import { dummyGetUserById } from "../../../utils/api/user";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import likeButtonImg from '../../../assets/img/heart.png'
import Button from "../../../components/buttons/Button";
import DropBox from "../drop_box/DropBox";
import Grid from "../../../components/grids/Grid";

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

    const handleClickLike = () => {

    }

    const handleClickOffer = () => {

    }

    const handleClickBuy = () => {

    }

    const getTraitsList = () => {
        let list = []
        JSON.parse(nft).traits.forEach(trait => {
            const jsx = (
                <div
                    style={{
                        backgroundColor: '#7B61FF',
                        color: '#ffffff',
                        fontSize: '16px',
                        textAlign: 'center',
                        padding: '0.5em'
                    }}
                >
                    {trait}
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div
            style={{
                margin: '10em 5em',
                padding: '0em 20em'
            }}
        >
            <div
                style={style.imgAndSpec}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '10em',
                        border: 'solid 1px #00FFA3',
                        width: '90%'
                    }}
                >
                    <Image
                        src={JSON.parse(nft).img}
                        preview={false}
                        width={'100%'}
                        style={{
                            margin: 'auto',
                        }}
                    />
                </div>
                <div
                    style={{
                        marginLeft: '50px',
                        width: '100%'
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: '#00FFA3',
                                marginBottom: '20px'
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
                                    justifyContent: 'start'
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}
                    >
                        <Button
                            text={
                                (
                                    <Image
                                        src={likeButtonImg}
                                        preview={false}
                                        width={'100%'}
                                    />
                                )
                            }
                            type={'function'}
                            style={{
                                backgroundColor: 'transparent',
                                border: 0,
                                cursor: 'pointer'
                            }}
                            clickFunction={handleClickLike}
                        />
                        <p
                            style={{
                                fontSize: '20px',
                                color: '#ffffff',
                                marginLeft: '10px'
                            }}
                        >
                            {JSON.parse(nft).like}
                        </p>
                    </div>
                    <Grid
                        lists={getTraitsList()}
                        numberOfColumn={5}
                        rowGap={10}
                        colGap={10}
                    />
                    <DropBox nft={nft} />
                    <div>
                        <p
                            style={{
                                color: '#F2F1F1',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                marginTop: '2em',
                                marginBottom: 0
                            }}
                        >
                            Price
                        </p>
                        <p
                            style={{
                                color: '#00FFA3',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                marginBottom: 0
                            }}
                        >
                            999 AN1
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: '#F2F1F1',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                border: 0,
                                marginRight: '20px',
                                width: '200px',
                                padding: '5px 50px',
                                cursor: 'pointer'
                            }}
                            text={'Offer'}
                            type={'function'}
                            clickFunction={handleClickOffer}
                        />
                        <Button
                            style={{
                                backgroundColor: '#00FFA3',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                border: 0,
                                width: '200px',
                                padding: '5px 50px',
                                cursor: 'pointer'
                            }}
                            text={'Buy'}
                            type={'function'}
                            clickFunction={handleClickBuy}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImgAndSpec