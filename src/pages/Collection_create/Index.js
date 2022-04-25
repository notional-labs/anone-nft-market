import Header from "../header/Header"
import Footer from "../footer/Footer"
import Forms from "./form/Forms"

const style = {
    container: {
        color: '#F2F1F1',
        position: 'relative',
        zIndex: 0   
    },
}

const CollectionCreate = ({ account, wrapSetAccount }) => {
    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            <Forms
                account={account}
            />
        </div>
    )
}

export default CollectionCreate