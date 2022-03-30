import { Image } from 'antd'
import bannerLogo from '../../assets/img/logo1.png'

const style = {
    headerNavbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const HomePage = ({ }) => {
    return (
        <div>
            <div style={style.headerNavbar}>
                <div style={{
                    padding: '3em 7em'
                }}> 
                    <Image
                        src={bannerLogo}
                        preview={false}
                        width={200}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage