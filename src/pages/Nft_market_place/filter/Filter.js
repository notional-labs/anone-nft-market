import { Slider, Input, Select, Form, AutoComplete, InputNumber, Image } from "antd"
import Button from "../../../components/buttons/Button"
import { openNotification } from "../../../components/notifications/notification";
import { fetchDummyBestCollections } from "../../../utils/fetch";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, useEffect } from "react";
import './Filter.css'
import Grid from "../../../components/grids/Grid";
import { IoSearch } from "react-icons/io5";
import { queryAllContracts } from "../../../anonejs/queryInfo";
import CollectionCard from "../collection_card/CollectionCard";

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
        padding: '1.5em 0'
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
        padding: '2em 0'
    }
}

const statusList = [
    'Buy Now', 'Has Offers'
]

const Filter = ({ }) => {
    const [form] = Form.useForm()
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
        priceMin: 0,
        priceMax: 0,
        traits: ''
    })

    useEffect(() => {
        (async () => {
            const res = await queryAllContracts(42)
            setCollections([...res])
            setFilterCollection([...res])
        })()
    }, [showTab.collections, filterValue.collections])

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
        setFilterValue({ ...filterValue, status: value })
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

    const getCollectionButtonText = (collection, index) => {
        return (
            <div
                key={index}
            >
                {
                    checkIfPicked(collection) ? (
                        <CollectionCard
                            addr={collection}
                            selected={true}
                        />
                    ) : (
                        <CollectionCard
                            addr={collection}
                            selected={false}
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
        const filter = collections.filter(col => col.includes(e.target.value))
        setFilterCollection([...filter])
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
                    style={style.button}
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
                        className="input"
                        style={{
                            ...style.dropBox,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <InputNumber
                            placeholder="Min"
                            min={0}
                            controls={false}
                            style={{
                                width: '100%'
                            }}
                        />
                        <p
                            style={{
                                fontSize: '24px',
                                color: '#ffffff',
                                margin: '0 1em 0 1em'
                            }}
                        >
                            to
                        </p>
                        <InputNumber
                            placeholder="Max"
                            min={0}
                            controls={false}
                            style={{
                                width: '100%'
                            }}
                        />
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
                        className="input"
                        style={{
                            ...style.dropBox,
                        }}
                    >
                        <Input
                            placeholder="Filter press enter to search"
                            prefix={<IoSearch />}
                            onChange={handleCollectionInput}
                            onPressEnter={handleCollectionInput}
                            style={{ borderRadius: '10px' }}
                        />
                        <div
                            style={{
                                marginTop: '2em',
                                height: '250px',
                                overflow: 'auto'
                            }}
                        >
                            {
                                filterCollection.map((collection, index) => {
                                    return (
                                        <Button
                                            type={'function'}
                                            clickFunction={() => handleSelectCollection(collection)}
                                            text={getCollectionButtonText(collection, index)}
                                            style={{
                                                color: '#ffffff',
                                                backgroundColor: 'transparent',
                                                fontSize: '1.5rem',
                                                margin: 0,
                                                border: 0
                                            }}
                                        />
                                    )
                                })
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
                        position: 'relative'
                    }}
                    clickFunction={() => { console.log('click') }}
                />
            </div>
        </div>
    )
}

export default Filter