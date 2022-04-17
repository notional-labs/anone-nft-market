import { Form, Switch, Input, message, Image, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from "../../../utils/imageProcessing";
import noImg from '../../../assets/img/no_image.png'
import Size from "../size/Size";
import { openNotification } from "../../../components/notifications/notification";
import { fetchDummyBestCollections } from "../../../utils/fetch";
import './Forms.css'

const { TextArea } = Input;

const { Option } = Select;

const options = [
    { label: 'Sneaker', value: 'sneaker' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Sport shoes', value: 'sport shoes' },
    { label: 'Running shoes', value: 'running shoes' },
    { label: 'Boots', value: 'boots' },
    { label: 'Sandal', value: 'sandal' },
];

const style = {
    container: {
        padding: '5em 35em',
        position: 'relative'
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

const Forms = ({ }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [collections, setCollections] = useState([])
    const [sizes, setSizes] = useState([])

    useEffect(() => {
        const res = fetchDummyBestCollections()
        setCollections([...res])
    }, [])

    const create = (values) => {
        console.log(values)
        openNotification('success', 'Submit successfully')
        reset()
    }

    const submitFail = () => {
        openNotification('error', 'Submit unsuccessfully')
    }

    const reset = () => {
        form.resetFields()
        setImgUrlLogo('')
        setImgUrlBanner('')
    }

    const wrapSetSize = useCallback((sizeList) => {
        setSizes([...sizeList])
    })

    const handleChange = (e, type) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                type === 'logo' ? setImgUrlLogo(reader.result) : setImgUrlBanner(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleChangeText = () => {

    }

    const handleChangeCheckbox = (e) => {

    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

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
                    style={style.label}
                >
                    Logo collection
                </p>
                <Form.Item
                    name={'logo'}
                    rules={[
                        () => ({
                            validator() {
                                if (imgUrlLogo && imgUrlLogo !== '') {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Must upload an image')
                            }
                        }),
                    ]}
                    status="error"
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-logo'
                        onChange={(e) => { handleChange(e, 'logo') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            width: '40%',
                            backgroundColor: '#626262'
                        }}
                    >
                        <label
                            htmlFor="input-logo"
                            className="logo"
                        >
                            <Image
                                src={imgUrlLogo || noImg}
                                preview={false}
                                width={'100%'}
                            />
                        </label>
                    </div>
                </Form.Item>
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
                        { required: true, message: 'Please input your collection name!' },
                        { max: 80, message: 'Max 80 characters!' }
                    ]}
                >
                    <Input
                        placeholder="Collection name"
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
                        { required: true, message: 'Please input your collection description!' },
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
                                        value={`${collection.id}`}
                                    >
                                        {collection.title}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <p
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
                </Form.Item>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <p
                            style={{
                                color: '#F2F1F1',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            Enable Royalties
                        </p>
                        <p
                            style={{
                                color: '#F2F1F1',
                                fontSize: '16px',
                                margin: 0
                            }}
                        >
                            Every time this NFT is sold you will receive this percentage of the sale. Max 5 recipients.
                        </p>
                    </div>
                    <Form.Item
                        name={'royalties'}
                        style={{
                            marginBottom: 0
                        }}
                    >
                        <Switch />
                    </Form.Item>
                </div>
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