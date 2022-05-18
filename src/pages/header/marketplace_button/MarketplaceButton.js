import { useState } from "react"
import Button from "../../../components/buttons/Button"
import './MarketplaceButton.css'
import { BsFillCollectionFill, } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";


const style = {
    button: {
        backgroundColor: 'transparent',
        border: 0,
        fontSize: '20px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    subButton: {
        backgroundColor: 'transparent',
        border: 0,
        color: '#F2F1F1',
        fontSize: '1rem',
        width: '100%',
        padding: '.5em 1em',
        cursor: 'pointer',
    }
}

const buttonType = [
    {
        logo: <GiTwoCoins />,
        text: 'NFTs'
    }, {
        logo: <BsFillCollectionFill />,
        text: 'Collections'
    }
]

const MarketplaceButton = ({ pathname }) => {
    const [show, setShow] = useState(false)

    const handleMouseOver = () => {
        setShow(true)
    }

    const handleMouseLeft = () => {
        setShow(false)
    }

    const getButtonText = (type) => {
        const icon = buttonType[type]
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    margin: 0
                }}
            >
                <div
                    style={{
                        marginRight: '20px',
                        marginBottom: 0,
                        position: 'relative',
                        fontSize: '2rem',
                        top: '5px'
                    }}
                >
                    {
                        icon.logo
                    }
                </div>
                <p
                    style={{
                        margin: 0,
                        position: 'relative',
                        top: '10px'
                    }}
                >
                    {icon.text}
                </p>
            </div>
        )
    }

    return (
        <div
            style={{
                borderBottom: pathname.includes('marketplace') || pathname.includes('explorer') ? 'solid 2px #00FFA3' : 'none'
            }}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeft}
        >
            <div
                className="menu-hover-button"
                style={{
                    position: 'relative',
                    margin: 'auto 30px',
                    height: '100%',
                    top: '27px',
                    zIndex: 2,
                }}
            >
                <Button
                    style={style.button}
                    text={'Explore'}
                />
                {
                    show && (
                        <div
                            style={{
                                backgroundColor: '#626262',
                                position: 'absolute',
                                textAlign: 'center',
                                left: '-100%',
                                width: '300%',
                                top: '70%',
                                borderRadius: '0 0 10px 10px',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                className="upper-button"
                            >
                                <Button
                                    style={style.subButton}
                                    text={getButtonText(0)}
                                    type={'link'}
                                    url={`/nft/marketplace`}
                                />
                            </div>
                            <div
                                className="lower-button"
                            >
                                <Button
                                    style={style.subButton}
                                    text={getButtonText(1)}
                                    type={'link'}
                                    url={`/collection/explorer`}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MarketplaceButton