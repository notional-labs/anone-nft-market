import { Form, Switch, Input, Slider, Image, Checkbox, Col, Row, InputNumber } from "antd"
import { useState } from "react";
import { beforeUpload } from "../../../utils/imageProcessing";
import Button from "../../../components/buttons/Button";
import { createCollection } from "../../../anonejs/createCollection";
import noImg from '../../../assets/img/no_image.png'
import { openNotification } from "../../../components/notifications/notification";
import { ipfsUpload } from "../../../anonejs/ipfsUpload";
import './Forms.css'

const { TextArea } = Input;

const checkValidString = (string) => {

}

// const options = [
//     { label: 'Sneaker', value: 'sneaker' },
//     { label: 'Shoes', value: 'shoes' },
//     { label: 'Sport shoes', value: 'sport shoes' },
//     { label: 'Running shoes', value: 'running shoes' },
//     { label: 'Boots', value: 'boots' },
//     { label: 'Sandal', value: 'sandal' },
// ];

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
    const [imgIpfsLogo, setImgIpfsLogo] = useState('')
    const [imgIpfsBanner, setImgIpfsBanner] = useState('')
    const [paymentAddr, setPaymentAddr] = useState(JSON.parse(account).account.address)

    const create = (values) => {
        setLoading(true)
        let config = {
            ...values,
            logo: imgIpfsLogo,
            banner: imgIpfsBanner,
            royaltyPaymentAddress: paymentAddr
        }
        const contractConfig = {
            royaltyPaymentAddress: config.royaltyPaymentAddress,
            royaltyShare: `${config.commission/10}`,
            baseTokenUri: 'ipfs://bafybeidfe5acjamg7kax65mvspt637ksr3wcdvvaiutmzhjgi74kddxf5q/galaxyiOigcK',
            numTokens: 5,
            an721CodeId: 42,
            name: `${config.name}`,
            symbol: 'TESTTWO',
            description: `${config.description}`,
            image: `${config.logo}`,
            externalLink: `${config.externalLink}`,
            perAddressLimit: config.limit,
        }
        const result = createCollection(contractConfig).then(result => {
            console.log(result)
            openNotification('success', 'Submit successfully')
            reset()
        }).catch(e => {
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

    const handleChange = (e, type) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                if (type === 'logo') {
                    setImgUrlLogo(reader.result)
                    ipfsUpload(reader.result).then(url => {
                        setImgIpfsLogo(url)
                    })
                } else {
                    setImgUrlBanner(reader.result)
                    ipfsUpload(reader.result).then(url => {
                        setImgIpfsBanner(url)
                    })
                }
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    // const handleClick = async () => {
    //     const result = await createCollection(Config);
    //     console.log(result)
    // }

    const handleChangeAddress = (e) => {
        setPaymentAddr(e.target.value)
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
                    Banner collection
                </p>
                <Form.Item
                    name={'banner'}
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
                    Receive address
                </p>
                <Form.Item
                    name={'royaltyPaymentAddress'}
                    rules={[
                        () => ({
                            validator() {
                                if (paymentAddr !== '') {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Please input payment address!')
                            }
                        }),
                    ]}
                >
                    <Input
                        placeholder="Royalty payment address"
                        defaultValue={JSON.parse(account).account.address}
                        onChange={handleChangeAddress}
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
                    External link
                </p>
                <Form.Item
                    name={'externalLink'}
                >
                    {/* <Checkbox.Group
                        style={{
                            width: '100%',
                            marginTop: '20px'
                        }}
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
                    </Checkbox.Group> */}
                    <Input
                        placeholder="External link"
                        style={{
                            padding: '1em',
                            color: '#286afa'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                    }}
                >
                    Limit per address
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Mint limit per address
                </p>
                <Form.Item
                    name={'limit'}
                    rules={[
                        { required: true, message: 'Please input a number!' },
                    ]}
                >
                    <InputNumber
                        placeholder="limit per address"
                        min={0}
                        max={50}
                        step={1}
                        style={{
                            padding: '.25em',
                            width: '100%',
                            fontSize: '20px'
                        }}
                    />
                </Form.Item>
                {/* <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '50px'
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
                        <Switch
                            defaultValue={true}
                        />
                    </Form.Item>
                </div> */}
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Commission rate (%)
                </p>
                <Form.Item
                    name={'commission'}
                >
                    <Slider
                        min={0.1}
                        max={10}
                        step={0.1}
                    />
                </Form.Item>
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