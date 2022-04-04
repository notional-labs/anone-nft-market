import Banner from './banner/Banner'
import Header from '../header/Header'
import Collection from './collection/Collections'
import Artist from './artist/Artist'
import Nft from './nft/Nft'
import Footer from './footer/Footer'

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    }
}

const HomePage = ({ }) => {
    return (
        <div
            style={style.container}
        >
            <Header/>
            <Banner />
            <Collection/>
            <Artist/>
            <Nft/>
            <Footer/>
        </div>
    )
}

export default HomePage