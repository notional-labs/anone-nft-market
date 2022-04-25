import { useEffect, useState } from "react"
import { Image, Select, Tooltip } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyTopNft } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import './NftList.css'
import Filter from "../filter/Filter"
import filterButtonImg from '../../../assets/img/filter.png'

const { Option } = Select;

const style = {
    title: {
        fontSize: '62px',
        textAlign: 'left',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        justifyContent: 'start'
    },
    card: {
        backgroundColor: 'transparent',
        border: 'solid 1px #00FFA3',
        padding: '1em'
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

    },
    cardText: {
        textAlign: 'left',
        color: '#ffffff'
    },
    button: {
        color: '#000000',
        fontSize: '20px',
        fontWeight: 700,
        backgroundColor: '#00FFA3',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto',
        textAlign: 'center',
        width: '100%'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2em'
    },
    imge: {

    },
    viewMoreButton: {
        color: '#00FFA3',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto 0'
    },
}

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}

const filterButtonText = (hasOpen) => {

    return hasOpen ? (
        <Image
            src={filterButtonImg}
            preview={false}
            width={30}
        />
    ) : (
        < Tooltip placement="topLeft" title={'Filter'} >
            <Image
                src={filterButtonImg}
                preview={false}
                width={30}
                style={{ backgroundColor: 'transparent' }}
            />
        </Tooltip >
    )
}



const NftList = ({ }) => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)
    const [select, setSelect] = useState('newest')
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        const res = fetchDummyTopNft()
        if (Array.isArray(res) && res.length > 0) {
            setNfts([...res])
        }
    }, [])

    const handleClick = () => {

    }

    const handleClickBuy = () => {

    }

    const handleSelect = (value) => {
        setSelect(value)
    }

    const getNftList = () => {
        let list = []
        nfts.forEach(nft => {
            const jsx = (
                <div
                    style={style.card}
                >
                    <div
                        style={{
                            padding: '2em',
                            paddingBottom: '5em'
                        }}
                    >
                        <Image
                            src={nft.img}
                            preview={false}
                            width={'100%'}
                            style={style.imge}
                        />
                    </div>
                    <div
                        style={style.cardText}
                    >
                        <p
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            Sneaker #{zeroPad(nft.id)}
                        </p>
                        <p>
                            {nft.quantity}/100
                        </p>
                    </div>
                    <div
                        style={{
                            width: '100%'
                        }}
                    >
                        <Button
                            clickFunction={handleClickBuy}
                            style={style.button}
                            type={'function'}
                            text={'Buy'}
                            className={'buy-button'}
                        />
                    </div>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    const handleFilterClick = () => {
        setShowFilter(!showFilter)
    }

    return (
        <div
            style={style.container}
        >
            <div
                style={{
                    padding: '2em',
                    paddingRight: 0,
                    position: 'fixed',
                    width: '300px'
                }}
            >
                <Button
                    type={'function'}
                    text={filterButtonText(showFilter)}
                    clickFunction={handleFilterClick}
                    style={{
                        backgroundColor: '#000000',
                        padding: '1em',
                        borderRadius: showFilter ? '10px 10px 0 0' : '10px',
                        border: 0
                    }}
                />
                {
                    showFilter && <Filter />
                }
            </div>
            <div
                style={{
                    marginLeft: '300px',
                    padding: '2em 5em'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '5em'
                    }}
                >
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#ffffff',
                            marginBottom: 0,
                            fontWeight: 'bold'
                        }}
                    >
                        12132 items
                    </p>
                    <Select
                        placeholder='Sort by'
                        allowClear={true}
                        style={{
                            width: '20%',
                        }}
                        onChange={handleSelect}
                    >
                        <Option
                            value={'newest'}
                        >
                            Most Recently
                        </Option>
                        <Option
                            value={'oldest'}
                        >
                            Oldest
                        </Option>
                        <Option
                            value={'highest'}
                        >
                            Price: Hight to Low
                        </Option>
                        <Option
                            value={'lowest'}
                        >
                            Price: Low to High
                        </Option>
                    </Select>
                </div>
                <div
                    style={style.grid}
                >
                    <Grid
                        lists={getNftList()}
                        numberOfColumn={4}
                        rowGap={35}
                        colGap={50}
                    />
                </div>
            </div>
        </div>
    )
}

export default NftList

