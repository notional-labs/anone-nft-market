import { useState } from "react"
import Button from "../../../components/buttons/Button"
import './CreateButton.css'

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

const CreateButton = ({ }) => {
    const [show, setShow] = useState(false)

    const handleMouseOver = () => {
        setShow(true)
    }

    const handleMouseLeft = () => {
        setShow(false)
    }

    return (
        <div
            className="menu-hover-button"
            style={{
                margin: '3em',
                position: 'relative',
                margin: 'auto 50px',
                height: '100%',
                zIndex: 2
            }}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeft}
        >
            <Button
                style={style.button}
                text={'Create'}
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
                            borderRadius: '10px'
                        }}
                    >
                        <Button
                            style={style.subButton}
                            text={'New Item'}
                            type={'href'}
                            url={`${process.env.REACT_APP_HOST}/nft/create`}
                        />
                        <Button
                            style={style.subButton}
                            text={'New Collection'}
                            type={'href'}
                            url={`/collection/create`}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default CreateButton