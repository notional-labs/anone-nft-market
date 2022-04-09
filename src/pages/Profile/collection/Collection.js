import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyBestCollections } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import './Collection.css'
import { Link } from "react-router-dom"

const style = {
    card: {
        backgroundColor: '#ffffff',
    },
    bannerCard: {
        padding: '0.8em',
    },
    avt: {
        position: 'relative',
        marginLeft: '40%',
        marginTop: '-13%'
    },
    cardText: {
        textAlign: 'center',
        padding: '20px 10px',
        color: '#000000'
    },
}

const Collection = ({ }) => {
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const res = fetchDummyBestCollections()
        if (Array.isArray(res) && res.length > 0) {
            setCollections([...res])
        }
    }, [])

    const handleClick = () => {

    }

    const getCollectionsList = () => {
        let list = []
        collections.forEach(col => {
            const jsx = (
                <div
                    className="card"
                >
                    <a
                        href={`${process.env.REACT_APP_HOST}/collection/${col.id}`}
                    >
                        <div
                            style={style.card}
                        >
                            <div
                                style={style.bannerCard}
                            >
                                <Image
                                    src={col.banner_img}
                                    preview={false}
                                    width={'100%'}
                                />
                            </div>
                            <div
                                style={style.avt}
                            >
                                <Image
                                    src={col.avt}
                                    preview={false}
                                    style={{
                                        borderRadius: '50%',
                                        margin: 'auto'
                                    }}
                                    width={'30%'}
                                />
                            </div>
                            <div
                                style={style.cardText}
                            >
                                <p
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}
                                >
                                    {col.title}
                                </p>
                                <p
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {col.description}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div>
            <Grid
                lists={getCollectionsList()}
                numberOfColumn={3}
                rowGap={35}
                colGap={50}
            />
        </div>
    )
}

export default Collection