import { Image, Input } from "antd"
import { useState } from "react"
import sneakerImg from '../../../assets/img/sneaker.png'
import Button from "../../../components/buttons/Button"

const style = {
    bannerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#ffffff',
        marginTop: '250px'
    },
    bannerText: {
        texAlign: 'left',
        position: 'relative',
        left: '150px',
        width: '35%'
    },
    text: {
        texAlign: 'left',
        fontSize: '20px',
        margin: 0
    },
    header: {
        color: '#00FFA3',
        fontWeight: 'bold',
        fontSize: '84px',
        margin: 0,
    },
    subscription: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '30px'
    },
    subscriptionButton: {
        backgroundColor: '#00FFA3',
        padding: '1em 1.5em',
        color: '#000000',
        border: 'none',
        cursor: 'pointer',
    }
}

const Banner = ({ }) => {
    const [subscriptionInput, setSubscriptionInput] = useState('')

    const handleClickSubscription = () => {
        console.log(subscriptionInput)
        // need add subscription feature
    }

    const handleChangeSubscriptionInput = (e) => {
        setSubscriptionInput(e.target.value)
    }

    return (
        <div
            style={style.bannerContainer}
        >
            <div
                style={style.bannerText}
            >
                <p
                    style={{ ...style.text, fontWeight: 500, fontSize: '24px' }}
                >
                    WELCOME TO ANOTHER-1 NFT MARKETPLACE
                </p>
                <h1
                    style={style.header}
                >
                    SNEAKER
                </h1>
                <p
                    style={{ ...style.text}}
                >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                <div
                    style={style.subscription}
                >
                    <p 
                        style={{
                            fontSize: '2em',
                            color: '#00FFA3',
                            fontWeight: 'bold',
                            margin: 'auto 0'
                        }}
                    >
                        SIGN UP FOR DROP
                    </p>
                    <Input 
                        placeholder="Email"
                        onChange={handleChangeSubscriptionInput}
                        style={{
                            width: '45%',
                            marginLeft: '10px'
                        }}
                    />
                    <Button
                        style={style.subscriptionButton}
                        text={'Submit'}
                        clickFunction={handleClickSubscription}
                        type={'function'}
                    />
                </div>
            </div>

            <div
                style={{
                    transform: 'rotate(-19.15deg)',
                    position: 'relative',
                    top: '-190px',
                    left: '60px',
                    zIndex: 0
                }}
            >
                <Image
                    src={sneakerImg}
                    preview={false}
                    width={750}
                />
            </div>
        </div>
    )
}

export default Banner