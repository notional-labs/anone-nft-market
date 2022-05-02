import { Form, Switch, Input, Image, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import noImg from '../../../assets/img/no_image.png'
import Size from "../size/Size";
import { openNotification } from "../../../components/notifications/notification";
import { fetchDummyBestCollections } from "../../../utils/fetch";
import { mintCallFromUser } from '../../../anonejs/mintNft'
import { queryAllContracts } from "../../../anonejs/queryInfo";
import CollectionCard from "../collection_card/CollectionCard";
import './Forms.css'

const { TextArea } = Input;

const { Option } = Select;

const style = {
    container: {
        padding: '5em 35em',
        position: 'relative',
        marginTop: '100px' 
    },
    title: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#00FFA3'
    },
    label: {
        color: '#F2F1F1',
        fontSize: '24px',
        marginBottom: 0,
        fontWeight: 'bold'
    }
}

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [collections, setCollections] = useState([])
    const [sizes, setSizes] = useState([])

    useEffect(() => {
        (async() => {
            const res = await queryAllContracts(69)
            setCollections([...res])
        })()
    }, [])

    const create = (values) => {
        console.log(values)
        setLoading(true)
        let config = {
            ...values,
            address: JSON.parse(account).account.address
        }
        const mintConfig = {
            address: config.address,
            minter_contract: config.collection,
            token_id: 69
        }
        mintCallFromUser(mintConfig).then(result => {
            console.log(result)
            openNotification('success', 'Submit successfully')
            reset()
        }).catch(e => {
            console.log(e.message)
            openNotification('error', e.message)
            reset()
        })
    }

    const submitFail = () => {
        openNotification('error', 'Submit unsuccessfully')
    }

    const reset = () => {
        form.resetFields()
        setImgUrlLogo('')
        setImgUrlBanner('')
    }

    // const handleChange = (e, type) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             type === 'logo' ? setImgUrlLogo(reader.result) : setImgUrlBanner(reader.result)
    //         }
    //     }
    //     reader.readAsDataURL(e.target.files[0]);
    // };

    return (
        <div
            style={style.container}
        >
            <p
                style={style.title}
            >
                Create New Item
            </p>
            <Form
                form={form}
                onFinish={create}
                onReset={reset}
                onFinishFailed={submitFail}
                layout="vertical"
            >
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Name
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Max 80 characters long.
                </p>
                <Form.Item
                    name={'name'}
                    rules={[
                        { max: 80, message: 'Max 80 characters!' }
                    ]}
                >
                    <Input
                        placeholder="NFT name"
                        style={{
                            padding: '1em'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Description
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Add a description to your collection. This will appear on the collection page.
                </p>
                <Form.Item
                    name={'description'}
                    rules={[
                        { max: 2000, message: 'Max 2000 characters!' }
                    ]}
                >
                    <TextArea rows={6}
                        placeholder="Description"
                        style={{
                            padding: '1em'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Collection
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    This is the collection where your item will appear.
                </p>
                <Form.Item
                    name={'collection'}
                    rules={[
                        { required: true, message: 'Please input select a collection!' },
                    ]}
                >
                    <Select 
                        placeholder='Select Collection'
                        allowClear={true}
                        style={{ 
                            width: '100%',
                        }}
                    >
                        {
                            collections.map(collection => {
                                return (
                                    <Option 
                                        value={`${collection}`}
                                    >
                                        <CollectionCard
                                            addr={collection}
                                        />
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                {/* <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Size
                </p>
                <Form.Item
                    name={'size'}
                    rules={[
                        { required: true, message: 'Please add at least one size!' },
                    ]}
                >
                    <Size wrapSetSize={wrapSetSize}/>
                </Form.Item> */}
                <div>
                    <button
                        htmlType="submit"
                        style={{
                            border: 0,
                            backgroundColor: '#00FFA3',
                            color: '#000000',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginTop: '50px',
                            padding: '0.5em 2em',
                            cursor: 'pointer'
                        }}
                    >
                        Create
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default Forms