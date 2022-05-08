import Header from "../header/Header"
import Layout from "./layout/Layout"

const style = {
    container: {
        position: 'relative',
        zIndex: 0 ,
    }
}


const EditPage = ({account, wrapSetAccount}) => {
    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            <Layout
                account={account}
            />
        </div>
    )
}

export default EditPage