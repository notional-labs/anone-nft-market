import { useCallback, useEffect, useState } from "react"
import { Image, Select, Tooltip } from "antd"
import Grid from "../../../components/grids/Grid"
import Button from "../../../components/buttons/Button"
import './NftList.css'
import Filter from "../filter/Filter"
import filterButtonImg from '../../../assets/img/filter.png'
import { getCollectionNfts, getMarketplaceNft, getPriceRangeNfts } from "../../../utils/nft/queryNft"
import NftCard from "../nft_card/NftCard"
import noItem from '../../../assets/img/no_item.png'
import loadingGif from '../../../assets/img/another.gif'
import FilterDisplay from "../filterDisplay/FIlterDisplay"
import { queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo"

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
                    margin: '0 0 0 10px',
                    position: 'relative',
                    top: '5px'
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

const MAX_PRICE = 1000000000

const NftList = ({ }) => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)
    const [select, setSelect] = useState('newest_listed')
    const [showFilter, setShowFilter] = useState(true)
    const [filterValue, setFilterValue] = useState({
        status: '',
        collections: [],
        priceMin: null,
        priceMax: null,
        traits: ''
    })
    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await getMarketplaceNft(select)
            setNfts([...res])
            setLoading(false)
            setInitialRender(false)
        })()
    }, [])

    const sort = (list) => {
        const res = list.sort((x, y) => {
            if (select === 'price_lowest') {
                return parseInt(x.list_price) - parseInt(y.list_price)
            }
            else if (select === 'oldest_listed') {
                return parseInt(x.listing_time) - parseInt(y.listing_time)
            }
            else if (select === 'price_highest') {
                return parseInt(y.list_price) - parseInt(x.list_price)
            }
            else {
                return parseInt(y.listing_time) - parseInt(x.listing_time)
            }
        })
        setNfts([...res])
    }

    useEffect(() => {
        if (!initialRender) {
            setLoading(true)
            sort([...nfts])
            setLoading(false)
        }
    }, [select])

    useEffect(() => {
        if (!initialRender) {
            (async () => {
                setLoading(true)
                let list = []
                if (filterValue.collections.length > 0) {
                    for (let collection of filterValue.collections) {
                        const contractAddr = await queryCollectionAddressOfLaunchpad(collection)
                        const res = await getCollectionNfts(contractAddr, select)
                        list = [...list, ...res]
                    }
                }
                if (filterValue.collections.length === 0) {
                    const res = await getMarketplaceNft(select)
                    list = [...res]
                }
                if (filterValue.priceMin !== null || filterValue.priceMax !== null) {
                    const max = filterValue.priceMax !== null ? filterValue.priceMax * 1000000 : MAX_PRICE * 10000000
                    const min = filterValue.priceMin !== null ? filterValue.priceMin * 1000000 : 0
                    console.log(min, max)
                    list = list.filter(x => parseInt(x.list_price) > min && parseInt(x.list_price) < max)
                }
                sort(list)
                setLoading(false)
            })()
        }
    }, [filterValue])

    const wrapSetList = useCallback((newList) => {
        setNfts([...newList])
    })

    const wrapSetFilter = useCallback((value) => {
        setFilterValue({ ...value })
    })

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
                    padding: '90px 0 2em',
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
                        padding: '2em 2em',
                        border: 0,
                        width: '100%',
                        textAlign: 'left'
                    }}
                    className={'filter-button'}
                />
                {
                    showFilter && <Filter
                        wrapSetter={wrapSetList}
                        wrapSetFilter={wrapSetFilter}
                        filterValue={filterValue}
                    />
                }
            </div>
            <div
                style={{
                    padding: '2em 5em',
                    marginTop: '100px',
                    marginLeft: showFilter ? '350px' : '50px',
                    width: '100%'
                }}
            >
                <div
                    className='option-header'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '2em',
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
                        defaultValue={'newest_listed'}
                    >
                        <Option
                            value={'newest_listed'}
                        >
                            Most Recently
                        </Option>
                        <Option
                            value={'oldest_listed'}
                        >
                            Oldest
                        </Option>
                        <Option
                            value={'price_highest'}
                        >
                            Price: Hight to Low
                        </Option>
                        <Option
                            value={'price_lowest'}
                        >
                            Price: Low to High
                        </Option>
                    </Select>
                </div>
                <FilterDisplay
                    filterValue={filterValue}
                    wrapSetFilter={wrapSetFilter}
                />
                {
                    loading ? (
                        <div
                            style={{
                                color: '#ffffff',
                                fontSize: '2rem',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '1em',
                                height: '70vh'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src={loadingGif}
                                    preview={false}
                                    width={'200px'}
                                />
                            </div>
                        </div>
                    ) : nfts.length > 0 ? (
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
                                color: '#ffffff',
                                fontSize: '2rem',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '1em',
                                height: '70vh'
                            }}
                        >
                            <div>
                                <Image
                                    src={noItem}
                                    preview={false}
                                    width={'200px'}
                                    style={{
                                        opacity: 1
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

