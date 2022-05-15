import { Input, Select, Form, InputNumber, Empty } from "antd"
import Button from "../../../components/buttons/Button"
import { openNotification } from "../../../components/notifications/notification";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, useEffect, useRef, useCallback } from "react";
import './Filter.css'
import Grid from "../../../components/grids/Grid";
import { IoSearch } from "react-icons/io5";
import { queryAllContracts } from "../../../anonejs/queryInfo";
import CollectionCard from "../collection_card/CollectionCard";
import VisibilitySensor from 'react-visibility-sensor';

const { Option } = Select;

const style = {
    container: {
        border: 0,
        backgroundColor: '#000000',
    },
    priceInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#ffffff',
        fontSize: '1.5rem'
    },
    filterTitle: {
        fontSize: '1.5rem',
        margin: 0,
        color: '#00FFA3'
    },
    button: {
        backgroundColor: 'transparent',
        border: 0,
        borderBottom: 'solid 1px #00FFA3',
        width: '100%',
        padding: '1.5em 2em'
    },
    buttonText: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    text: {
        color: '#00FFA3',
        fontSize: '24px',
        margin: 0
    },
    dropBox: {
        padding: '2em 2em',
        backgroundColor: '#000000'
    }
}

const statusList = [
    'Buy Now', 'Has Offers'
]

const NUMBER_COLLECTIONS_PER_SCREEN = 4

const Filter = ({ }) => {
    const [form] = Form.useForm()
    const [root, setRoot] = useState(null)
    const [collections, setCollections] = useState([])
    const [filterCollection, setFilterCollection] = useState([])
    const [showTab, setShowTab] = useState({
        status: false,
        collections: false,
        price: false,
        traits: false
    })
    const [filterValue, setFilterValue] = useState({
        status: '',
        collections: [],
        priceMin: null,
        priceMax: null,
        traits: ''
    })
    const [valid, setValid] = useState(true)
    const [stamp, setStamp] = useState(0)

    useEffect(() => {
        (async () => {
            const res = await queryAllContracts(process.env.REACT_APP_CODE_ID)
            setRoot(document.getElementById('containment'))
            setStamp(0)
            let sortedRes = res.sort((collectionAddr) => {
                if (filterValue.collections.filter(col => col === collectionAddr).length > 0) {
                    return -1
                }
                return 1
            })
            setCollections([...res])
            setFilterCollection([...sortedRes])
        })()
    }, [showTab.collections, filterValue.collections])

    // useEffect(() => {
    //     let sortedRes = collections.sort((collectionAddr) => {
    //         if (filterValue.collections.filter(col => col === collectionAddr).length > 0) {
    //             return -1
    //         }
    //         return 1
    //     })
    //     setFilterCollection([...sortedRes])
    // }, [filterValue.collections, showTab.collections])

    const wrapSetStamp = useCallback((val) => {
        setStamp(val)
    }, [])

    const apply = (value) => {
        console.log(value)
    }

    const reset = () => {
        form.resetFields()
    }

    const finishFail = () => {
        openNotification('error', 'Apply unsuccessfully')
    }

    const checkIfPicked = (id) => {
        if (filterValue.collections.filter(col => col === id).length > 0) {
            return true
        }
        return false
    }

    const handleClickStatus = (value) => {
        if (filterValue.status === value) {
            setFilterValue({ ...filterValue, status: '' })
        }
        else {
            setFilterValue({ ...filterValue, status: value })
        }
    }

    const getButtonText = (title, condition) => {
        return (
            <div
                style={style.buttonText}
            >
                <p
                    style={{ ...style.text, }}
                >
                    {title}
                </p>
                <p
                    style={style.text}
                >
                    <span
                        style={{
                            position: 'relative',
                            top: '15%',
                            fontSize: '24px',
                            margin: 0
                        }}
                    >
                        {
                            condition ? (
                                <MdKeyboardArrowUp />
                            ) : (
                                <MdKeyboardArrowDown />
                            )
                        }
                    </span>
                </p>
            </div>
        )
    }
    const getButtonList = () => {
        let list = []
        statusList.map(status => {
            const jsx = (
                <Button
                    type={'function'}
                    clickFunction={() => { handleClickStatus(status) }}
                    text={status}
                    style={{
                        backgroundColor: filterValue.status === status ? '#00FFA3' : '#F2F1F1',
                        color: '#000000',
                        border: 0,
                        width: '100%',
                        padding: '1em',
                        borderRadius: '10px'
                    }}
                />
            )
            list.push(jsx)
        })
        return list
    }

    const handleClick = (type) => {
        if (type === 'status') {
            setShowTab({ ...showTab, status: !showTab.status })
        }
        if (type === 'price') {
            setShowTab({ ...showTab, price: !showTab.price })
        }
        if (type === 'collections') {
            setShowTab({ ...showTab, collections: !showTab.collections })
        }
        if (type === 'traits') {
            setShowTab({ ...showTab, traits: !showTab.traits })
        }
    }

    const getCollectionButtonText = (collection, index, isVisible) => {
        return (
            <div
                key={index}
            >
                {
                    checkIfPicked(collection) ? (
                        <CollectionCard
                            addr={collection}
                            selected={true}
                            visible={isVisible}
                            index={index}
                            stamp={stamp}
                            wrapSetStamp={wrapSetStamp}
                        />
                    ) : (
                        <CollectionCard
                            addr={collection}
                            selected={false}
                            visible={isVisible}
                            index={index}
                            stamp={stamp}
                            wrapSetStamp={wrapSetStamp}
                        />
                    )
                }
            </div>
        )
    }

    const handleSelectCollection = (collection) => {

        if (!checkIfPicked(collection)) {
            setFilterValue({ ...filterValue, collections: [...filterValue.collections, collection] })
        }
        else {
            let filter = filterValue.collections.filter(id => id !== collection)
            setFilterValue({ ...filterValue, collections: [...filter] })
        }
    }

    const handleCollectionInput = (e) => {
        const filter = collections.filter(col => {
            if (col.includes(e.target.value) || filterValue.collections.filter(collection => collection === col).length > 0) {
                return true
            }
            return false
        })
        setFilterCollection([...filter])
    }

    const isValidMinPrice = (val) => {
        if (filterValue.priceMax === null || val === null) {
            return true
        }
        if (val > filterValue.priceMax) {
            return false
        }
        return true
    }

    const isValidMaxPrice = (val) => {
        if (filterValue.priceMin === null || val === null) {
            return true
        }
        if (filterValue.priceMin > val) {
            return false
        }
        return true
    }

    const handleChangePriceMin = (val) => {
        setFilterValue({ ...filterValue, priceMin: val })
        if (!isValidMinPrice(val)) {
            setValid(false)
        }
        else {
            setValid(true)
        }
    }

    const handleChangePriceMax = (val) => {
        setFilterValue({ ...filterValue, priceMax: val })
        if (!isValidMaxPrice(val)) {
            setValid(false)
        }
        else {
            setValid(true)
        }
    }

    return (
        <div
            className="filter-tab"
            style={{
                ...style.container,
            }}
        >
            <div
                style={{
                    width: '100%',
                    position: 'relative'
                }}
            >
                <Button
                    style={{
                        ...style.button,
                        borderTop: 'solid 1px #00FFA3'
                    }}
                    clickFunction={() => (handleClick('status'))}
                    text={getButtonText('Status', showTab.status)}
                    type={'function'}
                />
                {showTab.status && (
                    <div
                        style={style.dropBox}
                    >
                        <Grid
                            lists={getButtonList()}
                            numberOfColumn={2}
                        />
                    </div>
                )}
                <Button
                    style={style.button}
                    clickFunction={() => (handleClick('price'))}
                    text={getButtonText('Price', showTab.price)}
                    type={'function'}
                />
                {showTab.price && (
                    <div
                        style={{
                            backgroundColor: '#000000'
                        }}
                    >
                        <div
                            style={{
                                ...style.dropBox,
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <InputNumber
                                    placeholder="Min"
                                    min={0}
                                    controls={false}
                                    style={{
                                        width: '100%',
                                        padding: '.5em 0',
                                        borderRadius: '10px',
                                        fontSize: '20px'
                                    }}
                                    onChange={handleChangePriceMin}
                                    defaultValue={filterValue.priceMin}
                                />
                            </div>
                            <p
                                style={{
                                    fontSize: '24px',
                                    color: '#ffffff',
                                    margin: '.5em 1em 0 1em'
                                }}
                            >
                                to
                            </p>
                            <div>
                                <InputNumber
                                    placeholder="Max"
                                    min={0}
                                    controls={false}
                                    style={{
                                        width: '100%',
                                        padding: '.5em 0',
                                        borderRadius: '10px',
                                        fontSize: '20px'
                                    }}
                                    onChange={handleChangePriceMax}
                                    defaultValue={filterValue.priceMax}
                                />
                            </div>
                        </div>
                        {
                            !valid && (
                                <p
                                    style={{
                                        fontSize: '16px',
                                        color: 'red',
                                        padding: '0 2em'
                                    }}
                                >
                                    Minimum must be less than maximum
                                </p>
                            )
                        }
                    </div>
                )}
                <Button
                    style={style.button}
                    clickFunction={() => (handleClick('collections'))}
                    text={getButtonText('Collections', showTab.collections)}
                    type={'function'}
                />
                {showTab.collections && (
                    <div
                        style={{
                            ...style.dropBox,
                            backgroundColor: '#000000'
                        }}
                    >
                        <Input
                            placeholder="Filter press enter to search"
                            prefix={<IoSearch />}
                            onChange={handleCollectionInput}
                            onPressEnter={handleCollectionInput}
                            style={{
                                width: '100%',
                                padding: '.5em',
                                borderRadius: '10px',
                                fontSize: '20px'
                            }}
                        />
                        <div
                            id='containment'
                            style={{
                                marinTop: '1em',
                                height: '250px',
                                maxHeight: '250px',
                                overflowY: "scroll",
                                paddingTop: '1em'
                            }}
                        >
                            {
                                filterCollection.length > 0 ? (
                                    filterCollection.map((collection, index) => {
                                        return (
                                            <VisibilitySensor
                                                containment={root}
                                                key={index}
                                            >
                                                {({ isVisible }) => {
                                                    return (
                                                        <Button
                                                            type={'function'}
                                                            clickFunction={() => handleSelectCollection(collection)}
                                                            text={getCollectionButtonText(collection, index, isVisible)}
                                                            style={{
                                                                color: '#ffffff',
                                                                backgroundColor: 'transparent',
                                                                fontSize: '1.5rem',
                                                                margin: 0,
                                                                border: 0,
                                                                width: '100%',
                                                                height: '50px'
                                                            }}
                                                            className={'collection-filter-button'}
                                                        />
                                                    )
                                                }}
                                            </VisibilitySensor>
                                        )
                                    })) : (
                                    <div
                                        style={{
                                            position: 'relative',
                                            top: '50px',
                                            color: '#00FFA3'
                                        }}
                                    >
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                {/*need add traits specific*/}
                {/* <Button
                    style={style.button}
                    clickFunction={() => (handleClick('traits'))}
                    text={getButtonText('Traits', showTab.traits)}
                    type={'function'}
                />
                {showTab.traits && (
                    <div
                        className="input"
                        style={style.dropBox}
                    >
                        <Input />
                    </div>
                )} */}
                <Button
                    type={'function'}
                    text={'Apply'}
                    style={{
                        border: 0,
                        backgroundColor: '#00FFA3',
                        padding: '1em',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        width: '40%',
                        marginTop: '20px',
                        position: 'relative',
                        marginLeft: '2em'
                    }}
                    clickFunction={() => { console.log('click') }}
                />
            </div>
        </div>
    )
}

export default Filter