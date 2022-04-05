import Banner from './banner/Banner'
import Header from '../header/Header'
import Collection from './collection/Collections'
import Artist from './artist/Artist'
import Nft from './nft/Nft'
import Description from './description/Description'
import Footer from '../footer/Footer'
import { useState, useEffect, useCallback } from "react";

const style = {
    container: {
        position: 'relative',
        zIndex: 0   
    }
}

const HomePage = ({ }) => {
    const [account, setAccount] = useState(localStorage.getItem('account'))

    useEffect(() => {
        const storageAccount = localStorage.getItem('account')
        if (storageAccount !== null) {
            setAccount(storageAccount)
        }
    }, [])

    const wrapSetAccount = useCallback((value) => {
        setAccount(value)
    }, [setAccount])

    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            <Banner />
            <Collection/>
            <Artist/>
            <Nft/>
            <Description/>
            <Footer/>
        </div>
    )
}

export default HomePage