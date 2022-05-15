import { useEffect, useState } from "react"
import { queryAllContracts } from "../../../anonejs/queryInfo"
import { Image } from "antd"
import noItem from '../../../assets/img/no_item.png'
import Grid from "../../../components/grids/Grid"
import CollectionCard from "../collection_card/CollectionCard"
import loadingGif from '../../../assets/img/another.gif'

const style = {
    container: {
        padding: '5em',
        marginTop: '100px',
    },
    text: {
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '1em',
        color: '#ffffff',
        textAlign: 'center'
    }
}

const CollectionList = ({ }) => {
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await queryAllContracts(42)
                setCollections([...res])
                setLoading(false)
            }
            catch (e) {
                console.log(e.message)
                setLoading(false)
            }
        })()
    }, [])

    const getCollectionList = () => {
        let list = []
        collections.forEach(collection => {
            const jsx = (
                <CollectionCard
                    addr={collection}
                />
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div
            style={
                style.container
            }
        >
            <div
                style={style.text}
            >
                <span>
                    ALL
                </span>
                <span
                    style={{
                        color: '#00FFA3',
                        marginLeft: '10px'
                    }}
                >
                    COLLECTIONS
                </span>
            </div>
            {
                loading ? (
                    <div
                        style={{
                            color: '#ffffff',
                            fontSize: '3rem',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: '1em'
                        }}
                    >
                        <Image
                            src={loadingGif}
                            preview={false}
                            width={'20%'}
                        />
                    </div>
                ) : collections.length > 0 ? (
                    <div>
                        <Grid
                            lists={getCollectionList()}
                            numberOfColumn={4}
                            rowGap={20}
                            colGap={20}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            border: 'solid 1px #00FFA3',
                            color: '#ffffff',
                            fontSize: '3rem',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '1em'
                        }}
                    >
                        <div>
                            <Image
                                src={noItem}
                                preview={false}
                                width={'20%'}
                                style={{
                                    opacity: 0.6
                                }}
                            />
                        </div>
                        <p
                            style={{
                                marginBottom: 0,
                                marginTop: '1em'
                            }}
                        >
                            NO ITEMS FOUND
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default CollectionList