import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyBestCollections } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import { Link } from "react-router-dom"
import './Collections.css'

const style = {
    title: {
        fontSize: '62px',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    container: {

    },
    card: {
        backgroundColor: '#ffffff',
        color: '#000000'
    },
    bannerCard: {
        padding: '0.8em',
    },
    avt: {
        position: 'relative',
        marginLeft: '40%',
        marginTop: '-13%'
    },
    grid: {
        padding: '2em 20em'
    },
    cardText: {
        textAlign: 'center',
        padding: '20px 10px',
    },
    button: {
        color: '#00FFA3',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto 0'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2em'
    }
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
        const viewCollection = collections.slice(0, 6)
        viewCollection.forEach(col => {
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
            <div
                style={style.title}
            >
                <span
                    style={{
                        marginRight: '20px'
                    }}
                >
                    BEST
                </span>
                <span
                    style={{
                        color: '#00FFA3'
                    }}
                >
                    COLLECTIONS
                </span>
            </div>

            <div
                style={style.grid}
            >
                <Grid
                    lists={getCollectionsList()}
                    numberOfColumn={3}
                    rowGap={35}
                    colGap={50}
                />
            </div>
            <div
                style={style.buttonContainer}
            >
                <Button
                    clickFunction={handleClick}
                    text={'View more...'}
                    style={style.button}
                    type={'function'}
                />
            </div>
        </div>
    )
}

export default Collection