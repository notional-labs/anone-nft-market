import { Image } from "antd"
import twitter from '../../assets/img/twitter.png'
import discord from '../../assets/img/discord.png'
import telegram from '../../assets/img/telegram.png'

const style = {
    container: {
        padding: '0em 20em',
        marginTop: '10em',
        paddingBottom: '5em'
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
    },
    img: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        padding: '0em 7em 2em 7em',
    },
    text: {
        textAlign: 'center',
        color: '#ffffff'
    },
    contact: {
        
    },
    contackLink: {
        display: 'flex',
        justifyContent: 'start',
    },
    contactContainer: {
        display: 'flex',
        justifyContent: 'start',
        marginTop: '10em',
        paddingLeft: '5em',
        paddingRight: '5em'
    }
}

const Footer = ({ }) => {

    return (
        <div
            style={style.container}
        >
            <div
                style={style.contactContainer}
            >
                <div
                    style={style.contact}
                >
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#ffffff',
                            fontWeight: 'bold'
                        }}
                    >
                        Contact us:
                    </p>
                    <div
                        style={style.contackLink}
                    >
                        <a
                            href=''
                            style={{
                                marginRight: '70px'
                            }}
                            target={'_blank'}
                        >
                            <Image
                                src={twitter}
                                preview={false}
                                width={30}
                            />
                        </a>
                        <a
                            href='https://discord.gg/UTNjQbGA'
                            style={{
                                marginRight: '70px'
                            }}
                            target={'_blank'}
                        >
                            <Image
                                src={discord}
                                preview={false}
                                width={30}
                            />
                        </a>
                        <a
                            href=''
                            target={'_blank'}
                        >
                            <Image
                                src={telegram}
                                preview={false}
                                width={30}
                            />
                        </a>
                        <p
                            style={{
                                fontSize: '16px',
                                color: '#ffffff',
                                marginLeft: '10em'
                            }}
                        >
                            {'2021 ANOTHER-1 All rights reserved Terms & Conditions Privacy Polic'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer