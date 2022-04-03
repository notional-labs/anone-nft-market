import Grid from "../../../components/grids/Grid"
import { Image } from "antd"
import footerImg1 from '../../../assets/img/footer_1.png'
import footerImg2 from '../../../assets/img/footer_2.png'
import twitter from '../../../assets/img/twitter.png'
import discord from '../../../assets/img/discord.png'
import telegram from '../../../assets/img/telegram.png'

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

const footer = [
    {
        img: footerImg1,
        title: 'Connect your wallet',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
        img: footerImg2,
        title: 'Buy/Sell NFTs',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    }
]

const Footer = ({ }) => {

    const getFooterGrid = () => {
        let list = []
        footer.forEach(item => {
            const jsx = (
                <div
                    style={style.grid}
                >
                    <div
                        style={style.img}
                    >
                        <Image
                            src={item.img}
                            preview={false}
                            width={'100%'}
                        />
                    </div>
                    <div
                        style={style.text}
                    >
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}
                        >
                            {item.title}
                        </p>
                        <p
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            {item.description}
                        </p>
                    </div>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div
            style={style.container}
        >
            <Grid
                lists={getFooterGrid()}
                numberOfColumn={2}
                rowGap={35}
                colGap={300}
            />
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