import Header from "../header/Header"
import CollectionList from "./Collection_list/CollectionList"

const style = {
    container: {
        position: 'relative',
        zIndex: 0 ,
    }
}

const CollectionExplorer = ({ account, wrapSetAccount }) => {
    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            <CollectionList/>
        </div>
    )
}

export default CollectionExplorer;