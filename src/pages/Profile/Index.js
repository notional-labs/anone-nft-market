import Header from "../header/Header";
import Banner from "./banner/Banner";
import Asset from "./asset/Asset";
import Footer from "../footer/Footer";
import { useState, useEffect, useCallback } from "react";

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    }
}

const Profile = ({ }) => {
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
            {
                account !== null ? (
                    <div>
                        <Banner 
                            user={account}
                        />
                        <Asset />
                    </div>
                ) : (
                    <div
                        style={{
                            height: '60vh'
                        }}
                    >

                    </div>
                )
            }
            <Footer />
        </div>
    )
}

export default Profile