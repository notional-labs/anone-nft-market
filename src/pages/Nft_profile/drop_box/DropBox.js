import Button from "../../../components/buttons/Button"
import Grid from "../../../components/grids/Grid"
import { useState, useEffect } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import './DropBox.css'

const style = {
    button: {
        backgroundColor: '#000000',
        width: '100%',
        cursor: 'pointer',
        padding: '0.5em 1em',
    },
    buttonText: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    dropBox: {
        padding: '1em',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'absolute',
        width: '100%',
        borderRadius: '0 0 10px 10px',
        border: 'solid 1px #00FFA3',
        borderTop: 'none'
    },
    text: {
        color: '#ffffff',
        fontSize: '24px',
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

    const getTraitsList = () => {
        let list = []
        nft.metaData.attributes.forEach(trait => {
            const jsx = (
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
                        {trait.trait_type}
                    </p>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#000000'
                        }}
                    >
                        {trait.value}
                    </p>
                </div>
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
                style={{ ...style.text, }}
            >
                Properties
            </p>
            <p
                style={style.text}
            >
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
                marginTop: '50px',
                width: '100%',
                position: 'relative'
            }}
        >
            <Button
                style={{
                    ...style.button,
                    border: 'solid 1px #00FFA3',
                    borderBottom: showDropBox ? 'solid 1px transparent' : 'solid 1px #00FFA3',
                    borderRadius: showDropBox ? '10px 10px 0 0' : '10px',
                }}
                clickFunction={(handleClick)}
                text={buttonText}
                type={'function'}
            />
            {showDropBox && (
                <div
                    style={style.dropBox}
                    className='drop-down'
                >
                    <div
                        style={{
                            marginTop: '10px'
                        }}
                    >
                        <Grid
                            lists={getTraitsList()}
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