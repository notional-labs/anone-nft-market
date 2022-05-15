import { Form, Input, Slider, Image } from "antd"
import { useEffect, useState } from "react";
import { modifyCollectionInfo } from "../../../anonejs/modifyCollectionInfo";
import { openNotification } from "../../../components/notifications/notification";
import { ipfsUpload } from "../../../anonejs/ipfsUpload";
import noImg from "../../../assets/img/no_image.png";
import "./Forms.css";
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const style = {
    container: {
        marginTop: '150px',
        width: '100%',
        padding: '3em 35em',
        marginBottom: '5em'
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
        fontWeight: 'bold',
    }
}

const Forms = ({ account, collection, contractAddr }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [paymentAddr, setPaymentAddr] = useState(JSON.parse(account).account.address)
    const [share, setShare] = useState(parseFloat(collection.royaltyInfo.share))
    let navigate = useNavigate();

    useEffect(() => {
        setShare(parseFloat(collection.royaltyInfo.share))
    }, [])

    const update = async (values) => {
        setLoading(true)
        const logo = imgUrlLogo !== '' ? await ipfsUpload(imgUrlLogo) : ''
        let config = {
            ...values,
            logo: logo,
            royaltyPaymentAddress: paymentAddr
        }

        const contractConfig = {
            cw721ContractAddr: contractAddr,
            description: config.description ? config.description : collection.description,
            image: config.logo !== '' ? config.logo : collection.image,
            externalLink: config.externalLink ? config.externalLink : collection.externalLink,
            royaltyPaymentAddress: config.royaltyPaymentAddress ? config.royaltyPaymentAddress : collection.royaltyInfo.paymentAddr,
            royaltyShare: config.commission ? `${config.commission / 10}` : `${collection.royaltyInfo.share / 10}`
        }
        console.log(contractConfig)
        modifyCollectionInfo(contractConfig).then(result => {
            console.log(result)
            openNotification('success', 'Update successfully')
            reset()
            navigate(`/collection/${collection.contract_addr}`)
        }).catch(e => {
            openNotification('error', e.message)
            console.log(e.message)
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
                } else {
                    setImgUrlBanner(reader.result)
                }
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleChangeAddress = (e) => {
        setPaymentAddr(e.target.value)
    }

    const handleSlider = (val) => {
        setShare(val)
    }

    return (
        <div style={style.container}>
            <p
                style={{
                    fontSize: '48px',
                    color: '#00FFA3',
                    fontWeight: 'bold'
                }}
            >
                Update Collection
            </p>
            <Form
                form={form}
                onFinish={update}
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
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-logo'
                        onChange={(e) => { handleChange(e, 'logo') }}
                        style={{
                            display: 'none',
                        }}
                    />
                    <div
                        style={{
                            width: '20%',
                            borderRadius: '50%',
                            backgroundColor: 'gray'
                        }}
                    >
                        <label
                            htmlFor="input-logo"
                            className="logo"
                        >
                            <Image
                                src={imgUrlLogo !== '' ? imgUrlLogo : `https://ipfs.io/ipfs/${collection.image.split('ipfs://')[1]}`}
                                preview={false}
                                width={'100%'}
                                style={{
                                    aspectRatio: '1/1',
                                    borderRadius: '50%'
                                }}
                                fallback={noImg}
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
                >
                    <Input
                        placeholder="Collection name"
                        style={{
                            padding: '1em'
                        }}
                        defaultValue={collection.name}
                        disabled={true}
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
                        defaultValue={collection.description}
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
                        defaultValue={collection.royaltyInfo.payment_address}
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
                    <Input
                        placeholder="External link"
                        style={{
                            padding: '1em',
                            color: '#286afa'
                        }}
                        defaultValue={collection.externalLink}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    {
                        `Commission rate (${share.toFixed(2) / 10} %)`
                    }
                </p>
                <Form.Item
                    name={'commission'}
                >
                    <Slider
                        min={0.1}
                        max={10}
                        step={0.1}
                        defaultValue={parseFloat(collection.royaltyInfo.share) * 10}
                        onChange={handleSlider}
                    />
                </Form.Item>
                <div>
                    <button
                        htmltype="submit"
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
                        Update
                    </button>
                </div>
            </Form>
        </div >
    );
};

export default Forms;
