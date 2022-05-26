import Header from '../header/Header'
import NftList from './nft_list/NftList'

const style = {
    container: {
        position: 'relative',
        zIndex: 0 ,
    }
}

const NftMarketplace = ({ account, wrapSetAccount }) => {
    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            <NftList/>
        </div>
    )
}

export default NftMarketplace