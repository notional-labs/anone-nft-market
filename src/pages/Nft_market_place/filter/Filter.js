import { Slider, Input, Select, Form, AutoComplete, InputNumber, Image } from "antd"
import Button from "../../../components/buttons/Button"
import { openNotification } from "../../../components/notifications/notification";
import { fetchDummyBestCollections } from "../../../utils/fetch";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, useEffect } from "react";
import './Filter.css'
import Grid from "../../../components/grids/Grid";

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
    const [options, setOptions] = useState([]);
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
        const res = fetchDummyBestCollections()
        setCollections([...res])
    }, [])

    useEffect(() => {
        const res = fetchDummyBestCollections()
        setCollections([...res])
    }, [filterValue.collections])

    const apply = (value) => {
        console.log(value)
    }

    const reset = () => {
        form.resetFields()
    }

    const finishFail = () => {
        openNotification('error', 'Apply unsuccessfully')
    }

    const searchResult = (query) => {
        let result = collections.filter(collection => collection.title.includes(query))
        const option = result.map((res, index) => {
            return {
                value: res.title,
                key: index,
                label: (
                    <div>
                        {res.title}
                    </div>
                ),
            };
        })
        return option
    }

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const select = () => {
        setOptions([])
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
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    position: 'relative'
                }}
            >
                <Image
                    src={collection.avt}
                    preview={false}
                    width={'15%'}
                    style={{
                        borderRadius: '50%',
                    }}
                />
                <p
                    style={{
                        marginLeft: '20px'
                    }}
                >
                    {collection.title}
                </p>
            </div>
        )
    }

    const handleSelectCollection = (collection) => {
        if (filterValue.collections.filter(col => col.id === collection.id).length === 0) {
            setFilterValue({ ...filterValue, collection: [...filterValue.collections, collection.id] })
        }
    }

    const handleCollectionInput = (e) => {

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
                        style={{
                            ...style.dropBox,
                        }}
                    >
                        <Input
                            placeholder="Filter"
                            onChange={handleCollectionInput}
                        />
                        <div
                            style={{
                                marginTop: '2em',
                                height: '250px',
                                overflow: 'auto'
                            }}
                        >
                            {
                                collections.map((collection, index) => {
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
                <Button
                    style={style.button}
                    clickFunction={() => (handleClick('traits'))}
                    text={getButtonText('Traits', showTab.traits)}
                    type={'function'}
                />
                {showTab.traits && (
                    <div
                        style={style.dropBox}
                    >
                        <Input />
                    </div>
                )}
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
                    clickFunction={() => {console.log('click')}}
                />
            </div>
        </div>
    )
}

export default Filter