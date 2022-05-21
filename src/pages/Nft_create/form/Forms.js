import { Form, Input, Select } from "antd"
import { useEffect, useState } from "react";
import { openNotification } from "../../../components/notifications/notification";
import { mintCallFromUser } from '../../../anonejs/mintNft'
import { queryAllContracts, queryAllDataOfAllModels, queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo";
import Card from "../card/Card";
import './Forms.css'
import { openLoadingNotification } from "../../../components/notifications/notification";

const { TextArea } = Input;

const { Option } = Select;

const style = {
    container: {
        position: 'relative',
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
    const [selectCollection, setSelectCollection] = useState('')
    const [models, setModels] = useState([])
    const [sizes, setSizes] = useState([])

    useEffect(() => {
        (async () => {
            const res = await queryAllContracts(process.env.REACT_APP_CODE_ID)
            setCollections([...res])
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const contractAddr = await queryCollectionAddressOfLaunchpad(selectCollection)
            const res = await queryAllDataOfAllModels(contractAddr);
            console.log(res)
            setModels([...res.all_models_info])
        })()
    }, [selectCollection])

    const create = (values) => {
        setLoading(true)
        openLoadingNotification('open')
        let config = {
            ...values,
            address: JSON.parse(account).account.address
        }
        const mintConfig = {
            size: '38',
            minterContract: config.collection,
            modelId: config.model,
            address: config.address
        }
        mintCallFromUser(mintConfig).then(result => {
            openLoadingNotification('close')
            console.log(result)
            openNotification('success', 'Submit successfully')
            reset()
        }).catch(e => {
            openLoadingNotification('close')
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
                        { required: true, message: 'Please select a collection!' },
                    ]}
                    preserve={false}
                >
                    <Select
                        placeholder='Select Collection'
                        allowClear={true}
                        style={{
                            width: '100%',
                        }}
                        onSelect={(val) => {
                            setSelectCollection(val)
                        }}
                        autoClearSearchValue={true}
                    >
                        {
                            collections.map(collection => {
                                return (
                                    <Option
                                        value={`${collection}`}
                                    >
                                        <Card
                                            addr={collection}
                                            type={'collection'}
                                        />
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
                    Model
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    This is the model which your item will base in.
                </p>
                <Form.Item
                    name={'model'}
                    rules={[
                        { required: true, message: 'Please select a model!' },
                    ]}
                >
                    <Select
                        placeholder='Select model'
                        allowClear={true}
                        style={{
                            width: '100%',
                        }}
                    >
                        {
                            models.map(model => {
                                return (
                                    <Option
                                        value={`${model.model_id}`}
                                    >
                                        <Card
                                            addr={model}
                                            type={'model'}
                                            model={model}
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