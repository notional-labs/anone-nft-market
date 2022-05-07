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
                    margin: 'auto 50px',
                    height: '100%',
                    top: '30%',
                    zIndex: 2,
                }}
            >
                <Button
                    style={style.button}
                    text={'Create'}
                    type={'href'}
                    url={`${process.env.REACT_APP_HOST}/create`}
                    className={"menu-hover-button"}
                />
            </div>
        </div>
    )
}

export default CreateButton