import { useState } from "react"
import Button from "../../../components/buttons/Button"
import './MarketplaceButton.css'

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
        fontSize: '16px',
        width: '100%',
        padding: '2em',
        cursor: 'pointer'
    }
}

const MarketplaceButton = ({ pathname }) => {
    const [show, setShow] = useState(false)

    const handleMouseOver = () => {
        setShow(true)
    }

    const handleMouseLeft = () => {
        setShow(false)
    }

    return (
        <div
            style={{
                borderBottom: pathname.includes('marketplace') ? 'solid 2px #00FFA3' : 'none'
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
                    top: '30%',
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
                                left: '-70%',
                                width: '250%',
                                top: '70%',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                className="upper-button"
                            >
                                <Button
                                    style={style.subButton}
                                    text={'NFT'}
                                    type={'link'}
                                    url={`/nft/marketplace`}
                                />
                            </div>
                            <div
                                className="lower-button"
                            >
                                <Button
                                    style={style.subButton}
                                    text={'Collection'}
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