import { useState } from "react"
import Button from "../../../components/buttons/Button"
import './MarketplaceButton.css'

const style = {
    button: {
        backgroundColor: 'transparent',
        border: 0,
        fontSize: '24px',
        cursor: 'pointer',
    },
    subButton: {
        backgroundColor: 'transparent',
        border: 0,
        color: '#F2F1F1',
        fontSize: '16px',
        padding: '1em',
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
                    margin: 'auto 50px',
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
                                padding: '1em',
                                position: 'absolute',
                                textAlign: 'center',
                                left: '-70%',
                                width: '250%',
                                top: '70%',
                                borderRadius: '10px'
                            }}
                        >
                            <Button
                                style={style.subButton}
                                text={'NFT'}
                                type={'href'}
                                url={`${process.env.REACT_APP_HOST}/nft/marketplace`}
                            />
                            <Button
                                style={style.subButton}
                                text={'Collection'}
                                type={'href'}
                                url={`${process.env.REACT_APP_HOST}/collection/marketplace`}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MarketplaceButton