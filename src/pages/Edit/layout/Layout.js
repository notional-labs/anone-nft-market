import { useState } from "react"
import Button from "../../../components/buttons/Button"
import Forms from "../form/Forms"
import './Layout.css'

const style = {
    container: {
        marginTop: '90px',
        display: 'flex',
        justifyContent: 'start',
        color: '#ffffff',
    },
    sideTab: {
        position: 'fixed',
        width: '300px',
        backgroundColor: '#000000',
        fontSize: '24px',
        height: '100vh'
    },
    button: {
        border: 0,
        backgroundColor: 'transparent',
        textAlign: 'left',
        width: '100%',
        padding: '1em 2em 1em'
    }
}

const buttonList = [
    {
        text: 'Profile',
        value: 0,
    },
    {
        text: 'Your Nft',
        value: 1,
    },
    {
        text: 'Notification',
        value: 2,
    }
]

const Layout = ({ account }) => {
    const [tabSelect, setTabSelect] = useState(0)

    const changeTab = (val) => {
        setTabSelect(val)
    }

    return (
        <div
            style={style.container}
        >
            <div
                style={style.sideTab}
            >
                <p
                    style={{
                        fontSize: '16px',
                        padding: '2em 3em 1em',
                        color: '#00FFA3',
                        borderBottom: 'solid 1px #00FFA3'
                    }}
                >
                    SETTINGS
                </p>
                {
                    buttonList.map((button, index) => {
                        return (
                            <Button
                                key={index}
                                type={'function'}
                                clickFunction={() => changeTab(button.value)}
                                text={button.text}
                                style={{
                                    ...style.button,
                                    color: tabSelect === button.value && '#00FFA3'
                                }}
                                className={'hover-button'}
                            />
                        )
                    })
                }
            </div>
            <div
                style={{
                    marginLeft: '300px',
                    marginTop: '50px',
                    width: '100%',
                    padding: '0 10em',
                    marginBottom: '5em'
                }}
            >
                {
                    tabSelect === 0 && (
                        <Forms
                            account={account}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Layout