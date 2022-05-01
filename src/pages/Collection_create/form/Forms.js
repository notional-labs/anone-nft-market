import { Form, Input, Slider, InputNumber, Image } from "antd"
import { useState } from "react";
import { createCollection } from "../../../anonejs/createCollection";
import { openNotification } from "../../../components/notifications/notification";
import { ipfsUpload } from "../../../anonejs/ipfsUpload";
// import { createCollection } from "../../../anonejs/createCollection";
// import { createSale } from "../../../anonejs/createSale";
// import {makeOrder} from "../../../anonejs/makeOrder";
// import { updatePrice } from "../../../anonejs/updatePrice";
// import { cancelSale } from "../../../anonejs/cancelSale";
// import { queryAccountInfo } from "../../../anonejs/queryInfo";
// import { queryOfferingList } from "../../../anonejs/queryInfo";
import { queryNftInfoById } from "../../../anonejs/queryInfo";
// import { queryNumberOfNfts } from "../../../anonejs/queryInfo";
// import { queryNumberOfModels } from "../../../anonejs/queryInfo";
// import { queryAllDataOfAllNfts } from "../../../anonejs/queryInfo";
// import { queryAllDataOfAllModels } from "../../../anonejs/queryInfo";
import { queryAllContracts } from "../../../anonejs/queryInfo";
// import { queryCollectionInfo } from "../../../anonejs/queryInfo";
// import { getDataFromUri } from "../../../anonejs/getDataFromUri";
// import { getBase64, beforeUpload } from "../../../utils/imageProcessing";
import noImg from "../../../assets/img/no_image.png";
import "./Forms.css";

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
            royaltyShare: `${config.commission / 10}`,
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
    }

    const handleChangeAddress = (e) => {
        setPaymentAddr(e.target.value)
    }

    const handleChangeText = () => { };

    const handleChangeCheckbox = (e) => { };

    const Config2 = {
        cw721ContractAddr:
            "one1mych7nr7fk86y2ezekkqfwsqpl8ax659ez4r4lm87x6clhz65q9sn4ngte",
        nftMarketplaceContractAddr:
            "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
        msgListingPrice: { list_price: "5000000" }, // This msg is sent from cw721_contract to nft_marketplace_contract to list Nft
        token_id: "2",
    };

    const Config3 = {
        nftMarketplaceContractAddr:
            "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
        offering_id: '3',
        funds: [{ denom: 'uan1', amount: '5000000' }]
    };

    const Config4 = {
        nftMarketplaceContractAddr:
            "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
        offering_id: '4',
        update_price: '10000000'
    };

    const Config5 = {
        nftMarketplaceContractAddr:
            "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
        offering_id: '4'
    };

    const Config6 = {
        nftMarketplaceContractAddr:
            "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
        sortListing: "price_lowest"
    };

    const Config7 = {
        cw721ContractAddr:
            "one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0",
        tokenId: '1'
    };

    const Config8 = {
        cw721ContractAddr:
            "one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0",
        modelId: '1'
    };

  const handleClick = async () => {
    // const result = await createCollection(Config);
    // const result = await createSale(Config2);
    // const result = await makeOrder(Config3);
    // const result = await updatePrice(Config4);
    // const result = await cancelSale(Config5);
    // const result = await queryAccountInfo();
    // const result = await queryOfferingList(Config6);
    // const result = await queryNftInfoById(Config7);
    // const result = await queryModelInfoById(Config8);
    // const result = await queryNumberOfNfts('one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0');
    // const result = await queryNumberOfModels('one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0');
    // const result = await queryCollectionInfo('one1mych7nr7fk86y2ezekkqfwsqpl8ax659ez4r4lm87x6clhz65q9sn4ngte');
    // const result = await getDataFromUri('https://ipfs.io/ipfs/bafybeiaivv62j7jxlkahxobfr5io7h2j56obw5mojljho2ybg7zhah2eue/galaxyfcnCU3/1');
    // const result = await queryAllDataOfAllModels('one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq');
    const result = await queryAllContracts(69);
    console.log(result);
  };

    return (
        <div style={style.container}>
            <p style={style.title}>Create New Collection</p>
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
        </div >
    );
};

export default Forms;
