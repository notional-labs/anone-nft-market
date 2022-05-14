import Grid from "../../../components/grids/Grid"
import { Image } from "antd"
import footerImg1 from '../../../assets/img/footer_1.png'
import footerImg2 from '../../../assets/img/footer_2.png'
import sneaker from '../../../assets/img/sneaker2.png'

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

const style = {
    container: {
        padding: '0em 20em',
        marginTop: '10em',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
    },
    img: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        padding: '0em 7em 2em 7em',
        margin: 'auto'
    },
    text: {
        textAlign: 'center',
        color: '#ffffff'
    },
}

const Description = ({ }) => {
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
            <div
                style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >
                <span
                    style={{
                        color: '#00FFA3'
                    }}
                >
                    NFTS SNEAKERS
                </span>
                <span
                    style={{
                        color: '#ffffff',
                        marginLeft: '10px'
                    }}
                >
                    SYSTEM
                </span>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '15em'
                }}
            >
                <Image
                    src={sneaker}
                    preview={false}
                />
            </div>
            <Grid
                lists={getFooterGrid()}
                numberOfColumn={2}
                rowGap={35}
                colGap={300}
            />
        </div>
    )
}

export default Description