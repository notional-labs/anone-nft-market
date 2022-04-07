import Header from "../header/Header";
import Banner from "./banner/Banner";
import CollectionBanner from "./banner/CollectionBanner";
import Asset from "./asset/Asset";
import Footer from "../footer/Footer";
import { dummyGetUserById } from "../../utils/api/user";
import { getCollectionById } from "../../utils/api/collections";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    }
}

const Profile = ({ type, account, wrapSetAccount }) => {
    const [info, setInfo] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        console.log('hello')
        if (type === 'user-profile') {
            setInfo(account)
        }
        else if (type === 'profile') {
            const user = dummyGetUserById()
            user && setInfo(JSON.stringify(user))
        }
        else if (type === 'collection') {
            const collection = getCollectionById()
            setInfo(JSON.stringify(collection))
        }
    }, [type, account])

    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            {
                info !== null ? (
                    <div>
                        {
                            type !== 'collection' ?
                                type === 'user-profile' && account !== null ? (
                                    <Banner
                                        user={account}
                                        type={type}
                                    />
                                ) : (
                                    <Banner
                                        user={info}
                                        type={type}
                                    />
                                ) : (
                                    <CollectionBanner
                                        user={info}
                                        type={type}
                                    />
                                )
                        }
                        <Asset
                            user={info}
                            type={type}
                        />
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