import { Image } from "antd"
import { useLocation } from "react-router-dom"
import { openNotification } from "../../../components/notifications/notification"
import Button from "../../../components/buttons/Button"
import emailImg from '../../../assets/img/email.png'
import facebookImg from '../../../assets/img/facebook.png'
import twitterImg from '../../../assets/img/twit.png'
import behanceImg from '../../../assets/img/behance.png'
import shareImg from '../../../assets/img/share.png'
import settingImg from '../../../assets/img/setting.png'

const style = {
    link: {
        marginLeft: '20px',
        color: '#ffffff',
        fontSize: '16px',
    },
    contactContainer: {
        border: 'solid 1px #00FFA3',
        padding: '2em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        marginLeft: '20px',
        marginBottom: '20px'
    }
}

const Contact = ({ }) => {
    let location = useLocation();

    const handleClick = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_HOST}${location.pathname}`)
        openNotification('success', 'Save to clipboard')
    }

    return (
        <div
            style={{
                width: '25%',
                position: 'relative',
                left: '72%',
                top: '-300px',
                height: '250px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <Button
                    type={'function'}
                    style={style.button}
                    clickFunction={handleClick}
                    text={(
                        <Image
                            src={shareImg}
                            preview={false}
                            width={'100%'}
                        />
                    )}
                />
                <Button
                    type={'link'}
                    style={style.button}
                    url={'/user/profile/setting'}
                    text={(
                        <Image
                            src={settingImg}
                            preview={false}
                            width={'100%'}
                        />
                    )}
                />
            </div>
            <div
                style={style.contactContainer}
            >
                <p>
                    <Image
                        src={emailImg}
                        preview={false}
                        width={'30px'}

                    />
                    <span
                        style={style.link}
                    >
                        info@exmaple.com
                    </span>
                </p>
                <p>
                    <Image
                        src={facebookImg}
                        preview={false}
                        width={'30px'}

                    />
                    <span
                        style={style.link}
                    >
                        /infor.com
                    </span>
                </p>
                <p>
                    <Image
                        src={twitterImg}
                        preview={false}
                        width={'30px'}

                    />
                    <span
                        style={style.link}
                    >
                        /infor.com
                    </span>
                </p>
                <p
                    style={{
                        margin: 0
                    }}
                >
                    <Image
                        src={behanceImg}
                        preview={false}
                        width={'30px'}

                    />
                    <span
                        style={style.link}
                    >
                        /infor.com
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Contact