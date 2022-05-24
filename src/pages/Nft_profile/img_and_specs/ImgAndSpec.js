import { Image, Typography } from "antd"
import { dummyGetUserById } from "../../../utils/api/user";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import likeButtonImg from '../../../assets/img/heart.png'
import Button from "../../../components/buttons/Button";
import DropBox from "../drop_box/DropBox";
import Grid from "../../../components/grids/Grid";
import noImg from '../../../assets/img/no_image.png'
import Description from "../description/Description";
import an1Logo from '../../../assets/img/another1_logo.png'
import MakeOfferModal from "../../../components/modal/MakeOfferModal";
import { zeroPad } from "../../../utils/format";
import { getListPrice } from "../../../utils/nft/queryNft";

const { Paragraph } = Typography;

const style = {
    imgAndSpec: {
        display: 'flex',
        justifyContent: 'start',
    }
}
const ImgAndSpec = ({ nft }) => {
    const [showMakeOfferModal, setShowMakeOfferModal] = useState(false)
    const [price, setPrice] = useState(0) 
    const accountAddress = JSON.parse(localStorage.getItem('account')).account.address || ''

    useEffect(() => {
        (async () => {
            const price = await getListPrice(nft.contract_addr, nft.token_id)
            setPrice(price)
        })()
    }, [])

    const wrapSetShowMakeOfferModal = useCallback((value) => {
        setShowMakeOfferModal(value)
    }, [])

    const handleClickLike = () => {

    }

    const handleClickOffer = () => {
        setShowMakeOfferModal(true)
    }

    const handleClickBuy = () => {

    }

    console.log(nft)

    const getCard = (label, value) => {
        return (
            <div
                style={{
                    backgroundColor: '#7B61FF',
                    color: '#ffffff',
                    fontSize: '16px',
                    textAlign: 'center',
                    padding: '5px',
                    borderRadius: '10px'
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: '16px',
                    }}
                >
                    {label}
                </p>
                <p
                    style={{
                        margin: 0,
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#000000'
                    }}
                >
                    {value}
                </p>
            </div>
        )
    }

    const getTraitsList = () => {
        let list = []
        nft.metaData.attributes.forEach(trait => {
            const jsx = getCard(trait.trait_type, trait.value)
            list.push(jsx)
        })
        list.push(
            getCard('Size', nft.size)
        )
        return list
    }

    return (
        <div
            style={{
                margin: '10em 0',
                padding: '0em 25em',
            }}
        >
            <div
                style={style.imgAndSpec}
            >
                <div
                    style={{
                        width: '100%',
                        marginRight: '50px',
                        aspectRatio: '1/1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Image
                        src={`https://ipfs.io/ipfs/${nft.metaData.image.split('ipfs://')[1]}`}
                        preview={true}
                        width={'100%'}
                        style={{
                            margin: 'auto',
                            border: 'solid 1px #00FFA3',
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            aspectRatio: '1/1',
                        }}
                        fallback={noImg}
                    />
                </div>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <div>
                            <p
                                style={{
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    color: '#00FFA3',
                                    marginBottom: '20px'
                                }}
                            >
                                {nft.metaData.name} #{zeroPad(nft.token_id)}
                            </p>
                        </div>
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
                            </p>
                            <span
                                style={{
                                    color: '#00FFA3',
                                    marginLeft: '10px'
                                }}
                            >
                                <Paragraph
                                    copyable={{ text: nft.owner }}
                                    style={{
                                        color: '#ffffff',
                                        marginBottom: 0,
                                        fontSize: '20px'
                                    }}
                                >
                                    <Link
                                        to={`/profile/${nft.owner}`}
                                    >
                                        {nft.owner.slice(0, 20)}...
                                    </Link>
                                </Paragraph>
                            </span>
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
                                    cursor: 'pointer',
                                    marginLeft: '20px'
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
                                {nft.approvals.length} likes
                            </p>
                        </div>
                        <div
                            style={{
                                marginTop: '10px'
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    margin: 0
                                }}
                            >
                                Properties
                            </p>
                            <Grid
                                lists={getTraitsList()}
                                numberOfColumn={3}
                                rowGap={10}
                                colGap={10}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: '2em',
                            padding: '0 1em 0 0'
                        }}
                    >
                        <div
                            style={{
                                color: '#F2F1F1',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                marginBottom: 0
                            }}
                        >
                            Current price
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                            }}
                        >
                            <Image
                                src={an1Logo}
                                preview={false}
                                width={'40px'}
                                style={{
                                    borderRadius: '50%',
                                    position: 'relative',

                                }}
                            />
                            <div
                                style={{
                                    color: '#00FFA3',
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    marginBottom: 0,
                                    marginLeft: '10px'
                                }}
                            >
                                {
                                    nft.owner !== process.env.REACT_APP_MARKETPLACE_ADDRESS ? (
                                        'Not list yet'
                                    ) : (
                                        `${price} AN1`
                                    )
                                }
                            </div>
                        </div>
                        {
                            accountAddress !== '' && nft.owner === accountAddress && (
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr'
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
                                            width: '90%',
                                            padding: '5px 50px',
                                            cursor: 'pointer',
                                            borderRadius: '10px'
                                        }}
                                        text={'Offer'}
                                        type={'function'}
                                        clickFunction={handleClickOffer}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <MakeOfferModal
                nft={nft}
                show={showMakeOfferModal}
                wrapSetShow={wrapSetShowMakeOfferModal}
            />
        </div>
    )
}

export default ImgAndSpec