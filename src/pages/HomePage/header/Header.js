import { Image } from 'antd'
import bannerLogo from '../../../assets/img/logo1.png'
import ConnectButton from '../connect_button/ConnectButton'

const style = {
    headerNavbar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '150px'
    },
    logoContainer: {
        padding: '3em 7em'
    },
}

const Header = ({ }) => {
    return (
        <div
            style={style.headerNavbar}
        >
            <div
                style={style.logoContainer}
            >
                <Image
                    src={bannerLogo}
                    preview={false}
                    width={140}
                />
            </div>
            <div>
                <ConnectButton />
            </div>
        </div>
    )
}

export default Header