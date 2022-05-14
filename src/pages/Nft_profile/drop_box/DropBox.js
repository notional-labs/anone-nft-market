import Button from "../../../components/buttons/Button"
import Grid from "../../../components/grids/Grid"
import { useState, useEffect } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const style = {
    button: {
        border: 'solid 1px #00FFA3',
        backgroundColor: 'transparent',
        width: '100%',
        cursor: 'pointer',
        padding: '0.5em 1em'
    },
    buttonText: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    dropBox: {
        padding: '2em',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'absolute',
        width: '100%',
    },
    text: {
        color: '#ffffff',
        fontSize: '16px',
        margin: 0
    },
    sizeButton: {
        backgroundColor: '#F2F1F1',
        border: 'none',
        padding: '0.5em 0em',
        width: '100%',
        cursor: 'pointer',
    }
}

const DropBox = ({ nft }) => {
    const [showDropBox, setShowDropBox] = useState(false)

    const handleClick = () => {
        setShowDropBox(!showDropBox)
    }

    const handleSizeButtonClick = (value) => {
        setShowDropBox(false)
    }

    const getSizeList = () => {
        let list = []
        JSON.parse(nft).sizes.forEach(size => {
            const jsx = (
                <Button
                    type={'function'}
                    clickFunction={() => handleSizeButtonClick(size.size)}
                    style={style.sizeButton}
                    text={(
                        <div>
                            <p
                                style={{
                                    color: '#000000',
                                    fontSize: '12px',
                                    margin: 0
                                }}
                            >
                                {size.size}
                            </p>
                            <p
                                style={{
                                    color: '#20956B',
                                    fontSize: '12px',
                                    margin: 0
                                }}
                            >
                                {size.price} AN1
                            </p>
                        </div>
                    )}
                />
            )
            list.push(jsx)
        })
        return list
    }

    const buttonText = (
        <div
            style={style.buttonText}
        >
            <p
                style={{ ...style.text, transform: 'translateY(20%)' }}
            >
                Size:
            </p>
            <p
                style={style.text}
            >
                All
                <span
                    style={{
                        position: 'relative',
                        top: '15%',
                        fontSize: '24px',
                        margin: 0
                    }}
                >
                    {
                        showDropBox ? (
                            <MdKeyboardArrowDown />
                        ) : (
                            <MdKeyboardArrowUp />
                        )
                    }
                </span>
            </p>
        </div>
    )

    return (
        <div
            style={{
                marginTop: '5em',
                width: '100%',
                position: 'relative'
            }}
        >
            <Button
                style={style.button}
                clickFunction={(handleClick)}
                text={buttonText}
                type={'function'}
            />
            {showDropBox && (
                <div
                    style={style.dropBox}
                >
                    <p>
                        Select Size
                    </p>
                    <div>
                        <Button
                            style={style.sizeButton}
                            type={'function'}
                            clickFunction={() => handleSizeButtonClick('all')}
                            text={
                                (
                                    <div>
                                        <p
                                            style={{
                                                color: '#000000',
                                                fontSize: '12px',
                                                margin: 0
                                            }}
                                        >
                                            All
                                        </p>
                                        <p
                                            style={{
                                                color: '#20956B',
                                                fontSize: '12px',
                                                margin: 0
                                            }}
                                        >
                                            999 AN1
                                        </p>
                                    </div>
                                )
                            }
                        />
                    </div>
                    <div
                        style={{
                            marginTop: '10px'
                        }}
                    >
                        <Grid
                            lists={getSizeList()}
                            numberOfColumn={3}
                            rowGap={10}
                            colGap={10}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropBox