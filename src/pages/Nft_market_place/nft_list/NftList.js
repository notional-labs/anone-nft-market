import { useEffect, useState } from "react"
import { Image, Select, Tooltip } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyTopNft } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import './NftList.css'
import Filter from "../filter/Filter"
import filterButtonImg from '../../../assets/img/filter.png'
import { getMarketplaceNft } from "../../../utils/nft/queryNft"
import NftCard from "../nft_card/NftCard"
import noItem from '../../../assets/img/no_item.png'

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
        justifyContent: 'start',
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

const filterButtonText = (hasOpen) => {

    return hasOpen ? (
        <div>
            <Image
                src={filterButtonImg}
                preview={false}
                width={30}
            />
            <span
                style={{
                    color: '#00FFA3',
                    fontSize: '24px',
                    margin: '0 0 0 10px'
                }}
            >
                Filter
            </span>
        </div>
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
    const [select, setSelect] = useState('')
    const [showFilter, setShowFilter] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await getMarketplaceNft(select)
            setNfts([...res])
        })()
    }, [select])

    const handleSelect = (value) => {
        setSelect(value)
    }

    const getNftList = () => {
        let list = []
        nfts.forEach(nft => {
            const jsx = (
                <NftCard
                    offerObject={nft}
                />
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
                className="filter-tab-content"
                style={{
                    padding: '100px 2em 2em 2em',
                    backgroundColor: '#000000',
                    position: 'fixed',
                    width: showFilter ? '350px' : '100px',
                    overflow: 'auto',
                }}
            >
                <Button
                    type={'function'}
                    text={filterButtonText(showFilter)}
                    clickFunction={handleFilterClick}
                    style={{
                        backgroundColor: '#000000',
                        padding: '2em 1em 1em 0',
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
                    padding: '2em 5em',
                    marginTop: '150px',
                    marginLeft: showFilter ? '350px' : '50px',
                    width: '100%'
                }}
            >
                <div
                    className='option-header'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '5em',
                    }}
                >
                    <p
                        style={{
                            fontSize: '20px',
                            color: '#ffffff',
                            marginBottom: 0,
                        }}
                    >
                        {nfts.length} items
                    </p>
                    <Select
                        placeholder='Sort by'
                        allowClear={true}
                        style={{
                            borderRadius: '10px',
                            width: '20%'
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
                {
                    nfts.length > 0 ? (
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
        </div>
    )
}

export default NftList

