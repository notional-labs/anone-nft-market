import { Form, Input, Image, Select } from "antd";
import { useEffect, useState } from "react";
import { openNotification, openLoadingNotification, } from "../../../components/notifications/notification";
import { ipfsUpload } from "../../../anonejs/ipfsUpload";
import noImg from "../../../assets/img/no_image.png";
import { createModel } from "../../../anonejs/createModel";
import { queryNumberOfModels, queryCollectionAddressOfLaunchpad, queryAllContracts } from "../../../anonejs/queryInfo";
import CollectionCard from "../collection_card/CollectionCard";
import Button from "../../../components/buttons/Button";
import { PlusCircleOutlined } from '@ant-design/icons'
import { TiDeleteOutline } from "react-icons/ti";

const { TextArea } = Input;
const { Option } = Select;

const style = {
    container: {
        marginTop: '50px',
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
    },
    input: {
        marign: '10px',
        padding: '1em',
        width: '97%'
    },
    propertiesText: {
        margin: 0
    }
}

const makeTextFile = (obj) => {
    let textFile = null
    const data = new Blob([obj], { type: 'text/json' });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
};

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [collections, setCollections] = useState([])
    const [properties, setProperties] = useState([{
        trait_type: '',
        value: ''
    }])

    useEffect(() => {
        (async () => {
            const res = await queryAllContracts(process.env.REACT_APP_CODE_ID)
            setCollections([...res])
        })()
    }, [])

    // useEffect(() => {
    //     console.log(properties)
    // }, [properties])

    const create = async (values) => {
        openLoadingNotification('open')
        const logo = imgUrlLogo !== '' ? await ipfsUpload(imgUrlLogo) : ''
        let config = {
            ...values,
            logo: logo,
        }
        const metaData = {
            attributes: [...properties],
            description: config.description,
            image: config.logo,
            name: config.name
        }
        const contractAddr = await queryCollectionAddressOfLaunchpad(config.collection)
        const numOfModel = await queryNumberOfModels(contractAddr)
        const filePath = makeTextFile(JSON.stringify(metaData))
        const ipfsPath = await ipfsUpload(filePath)

        const contractConfig = {
            minterContract: config.collection,
            modelId: `${numOfModel}`,
            modelUri: ipfsPath
        }

        console.log(contractConfig)
        createModel(contractConfig).then(() => {
            openLoadingNotification('close')
            openNotification('success', 'Submit successfully')
            reset()
        }).catch(e => {
            openLoadingNotification('close')
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
    }

    const handleChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImgUrlLogo(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleRemoveProperty = (index) => {
        const filterProperties = properties.filter((prop, i) => i !== index)
        setProperties([...filterProperties])
    }

    const onChange = (e, index, type) => {
        let propList = [...properties]
        propList[index] = type === 'type' ? {
            ...propList[index],
            trait_type: e.target.value
        } : {
            ...propList[index],
            value: e.target.value
        }
        setProperties([...propList])
    }

    return (
        <div style={style.container}>
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
                    Logo model
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
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-logo-model'
                        onChange={(e) => handleChange(e)}
                        style={{
                            display: 'none',
                        }}
                    />
                    <div
                        style={{
                            width: '40%',
                            backgroundColor: 'gray',
                            borderRadius: '10px'
                        }}
                    >
                        <label
                            htmlFor="input-logo-model"
                            className="logo"
                        >
                            <Image
                                src={imgUrlLogo || noImg}
                                preview={false}
                                width={'100%'}
                                style={{
                                    aspectRatio: '1.5/1',
                                    borderRadius: '10px'
                                }}
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
                    Name model
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
                        { required: true, message: 'Please input your model name!' },
                        { max: 80, message: 'Max 80 characters!' }
                    ]}
                >
                    <Input
                        placeholder="Model name"
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
                    Add a description to the model.
                </p>
                <Form.Item
                    name={'description'}
                    rules={[
                        { required: true, message: 'Please input your model description!' },
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
                    Properties
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Properties show up underneath your item. Each model can have upto 10 Properties
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        flexDirection: 'column'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '60%',
                            color: '#ffffff',
                            fontSize: '1.2rem'
                        }}
                    >
                        <div
                            style={{
                                width: '95%'
                            }}
                        >
                            <p
                                style={
                                    style.propertiesText
                                }
                            >
                                Type
                            </p>
                        </div>
                        <div
                            style={{
                                width: '95%',
                                textAlign: 'end'
                            }}
                        >
                            <p
                                style={{
                                    ...style.propertiesText,
                                    textAlign: 'start'
                                }}
                            >
                                Value
                            </p>
                        </div>
                    </div>
                    {
                        properties.map((property, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '60%',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '95%'
                                            }}
                                        >
                                            <Input
                                                style={style.input}
                                                placeholder='Type'
                                                onChange={(e) => onChange(e, index, 'type')}
                                                value={property.trait_type}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                width: '95%',
                                                textAlign: 'end'
                                            }}
                                        >
                                            <Input
                                                style={style.input}
                                                placeholder='Value'
                                                onChange={(e) => onChange(e, index, 'value')}
                                                value={property.value}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type={'function'}
                                        clickFunction={() => handleRemoveProperty(index)}
                                        text={(
                                            <div>
                                                <TiDeleteOutline />
                                            </div>
                                        )}
                                        style={{
                                            border: 0,
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer',
                                            color: '#ffffff',
                                            fontSize: '2rem',
                                            position: 'relative',
                                            top: '25%'
                                        }}

                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Button
                        type={'function'}
                        clickFunction={() => {
                            setProperties([...properties, {
                                trait_type: '',
                                value: ''
                            }])
                        }}
                        text={(
                            <div>
                                <PlusCircleOutlined /> Add more
                            </div>
                        )}
                        style={{
                            width: '60%',
                            border: 'solid 1px #00FFA3',
                            color: '#00FFA3',
                            backgroundColor: 'transparent',
                            fontSize: '20px',
                            padding: '.5em',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    />
                </div>
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
                    This is the collection where your nfts will appear.
                </p>
                <Form.Item
                    name={'collection'}
                    rules={[
                        { required: true, message: 'Please select a collection!' },
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
                        Create
                    </button>
                </div>
            </Form>
        </div >
    );
}

export default Forms
