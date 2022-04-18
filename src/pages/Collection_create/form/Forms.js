import { Form, Switch, Input, message, Image, Checkbox, Col, Row } from "antd"
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from "../../../utils/imageProcessing";
import Button from "../../../components/buttons/Button";
import { createCollection } from "../../../anonejs/createCollection";
import noImg from '../../../assets/img/no_image.png'
import { openNotification } from "../../../components/notifications/notification";
import './Forms.css'

const { TextArea } = Input;

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

    const Config = {
        royaltyPaymentAddress: JSON.parse(localStorage.getItem("account")).account.address,
        royaltyShare: '0.1',
        baseTokenUri: 'ipfs://bafybeidfe5acjamg7kax65mvspt637ksr3wcdvvaiutmzhjgi74kddxf5q/galaxyiOigcK',
        numTokens: 5,
        an721CodeId: 42,
        name: 'Test Collection 2',
        symbol: 'TESTTWO',
        description: 'An awesome NFT series',
        image: 'ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png',
        externalLink: 'https://www.youtube.com/watch?v=1YML6_zRssg',
        perAddressLimit: 1,
    }

    const handleClick = async () => {
        const result = await createCollection(Config);
        console.log(result)
    }

    return (
        <div
            style={style.container}
        >
            <p
                style={style.title}
            >
                Create New Collection
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
                                if(imgUrlLogo && imgUrlLogo !== '') {
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
                    Banner collection
                </p>
                <Form.Item
                    name={'banner'}
                    rules={[
                        () => ({
                            validator() {
                                if(imgUrlLogo && imgUrlLogo !== '') {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Must upload an image')
                            }
                        }),
                    ]}
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-banner'
                        onChange={(e) => { handleChange(e, 'banner') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            width: '65%',
                            backgroundColor: '#626262',
                            height: '250px',
                            overflow: "hidden"
                        }}
                    >
                        <label
                            htmlFor="input-banner"
                            className="logo"
                        >
                            <Image
                                src={imgUrlBanner || noImg}
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
                    Name collection
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
                    Categories
                </p>
                <Form.Item
                    name={'trait'}
                    rules={[
                        { required: true, message: 'Please select a trait(s)' },
                    ]}
                >
                    <Checkbox.Group
                        style={{
                            width: '100%',
                            marginTop: '20px'
                        }}
                        onChange={handleChangeCheckbox}
                    >
                        <Row>
                            {
                                options.map(option => {
                                    return (
                                        <Col span={8}>
                                            <Checkbox
                                                value={`${option.value}`}
                                                style={{
                                                    color: '#F2F1F1',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        position: 'relative',
                                                        top: '-10px',
                                                        marginLeft: '20px'
                                                    }}
                                                >
                                                    {option.label}
                                                </p>
                                            </Checkbox>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Checkbox.Group>
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
                    
                    <Button
                        clickFunction={handleClick}
                        type={'function'}
                        text={'CREATE'}
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
                    />
                </div>
            </Form>
        </div>
    )
}

export default Forms