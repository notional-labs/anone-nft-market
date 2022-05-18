import { useState } from "react"
import Button from "../../../components/buttons/Button"
import './CreateButton.css'

const style = {
    button: {
        backgroundColor: 'transparent',
        border: 0,
        fontSize: '20px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
}

const CreateButton = ({ pathname }) => {
    return (
        <div
            style={{
                borderBottom: pathname.includes('create') ? 'solid 2px #00FFA3' : 'none',
            }}
        >
            <div
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
                    text={'Create'}
                    type={'link'}
                    url={`/create`}
                    className="menu-hover-button"
                />
            </div>
        </div>
    )
}

export default CreateButton