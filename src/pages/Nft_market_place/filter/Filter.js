import { Slider, Input, Select, Form, AutoComplete, InputNumber } from "antd"
import Button from "../../../components/buttons/Button"
import { openNotification } from "../../../components/notifications/notification";
import { fetchDummyBestCollections } from "../../../utils/fetch";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, useEffect } from "react";
import './Filter.css'

const { Option } = Select;

const style = {
    container: {
        border: 0,
        padding: '1em',
        backgroundColor: '#000000',
        borderRadius: '0 10px 10px 10px',
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
}

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
    const [value, setValue] = useState({
        status: '',
        collections: '',
        priceMin: 0,
        priceMax: 0,
        traits: ''
    })

    useEffect(() => {
        const res = fetchDummyBestCollections()
        setCollections([...res])
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
                                <MdKeyboardArrowDown />
                            ) : (
                                <MdKeyboardArrowUp />
                            )
                        }
                    </span>
                </p>
            </div>
        )
    }

    const handleClick = (type) => {
        if(type === 'status') {
            setShowTab({...showTab, status: !showTab.status})
        } 
        if(type === 'price') {
            setShowTab({...showTab, price: !showTab.price})
        } 
        if(type === 'collections') {
            setShowTab({...showTab, collections: !showTab.collections})
        } 
        if(type === 'traits') {
            setShowTab({...showTab, traits: !showTab.traits})
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
                    style={style.button}
                    clickFunction={() => (handleClick('status'))}
                    text={getButtonText('Status', showTab.status)}
                    type={'function'}
                />
                {showTab.status && (
                    <div>
                        <Input/>
                    </div>
                )}
                 <Button
                    style={style.button}
                    clickFunction={() => (handleClick('price'))}
                    text={getButtonText('Price', showTab.price)}
                    type={'function'}
                />
                {showTab.price && (
                    <div>
                        <Input/>
                    </div>
                )}
                <Button
                    style={style.button}
                    clickFunction={() => (handleClick('collections'))}
                    text={getButtonText('Collections', showTab.collections)}
                    type={'function'}
                />
                {showTab.collections && (
                    <div>
                        <Input/>
                    </div>
                )}
                 <Button
                    style={style.button}
                    clickFunction={() => (handleClick('traits'))}
                    text={getButtonText('Traits', showTab.traits)}
                    type={'function'}
                />
                {showTab.traits && (
                    <div>
                        <Input/>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Filter