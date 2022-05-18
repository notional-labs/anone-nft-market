import Header from "../header/Header";
import Banner from "./banner/Banner";
import CollectionBanner from "./banner/CollectionBanner";
import Asset from "./asset/Asset";
import Footer from "../footer/Footer";
import { dummyGetUserById } from "../../utils/api/user";
import { getCollectionById } from "../../utils/api/collections";
import ConnectWalletPage from "../Connect_wallet_error_page/Index";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { queryCollectionInfo, queryCollectionAddressOfLaunchpad } from "../../anonejs/queryInfo";

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
        (async () => {
            if (type === 'user-profile') {
                setInfo(account)
            }
            else if (type === 'profile') {
                const user = dummyGetUserById()
                user && setInfo(JSON.stringify(user))
            }
            else if (type === 'collection') {
                const contractAddr = await queryCollectionAddressOfLaunchpad(id)
                const res = await queryCollectionInfo(contractAddr)
                setInfo(JSON.stringify({
                    ...res,
                    contractAddr
                }))
            }
        })()
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
                !account && type === 'user-profile' ? (
                    <div
                        style={{
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '40%',
                            margin: 'auto',
                            color: '#ffffff'
                        }}
                    >
                        <ConnectWalletPage
                            wrapSetAccount={wrapSetAccount}
                        />
                    </div>
                ) : info !== null ? (
                    <div
                        style={{
                            marginTop: '90px'
                        }}
                    >
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
                                        collection={info}
                                        type={type}
                                        id={id}
                                        account={account}
                                    />
                                )
                        }
                        <Asset
                            id={id}
                            info={info}
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
        </div>
    )
}

export default Profile