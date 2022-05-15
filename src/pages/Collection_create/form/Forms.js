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
import { queryAllDataOfAllNfts } from "../../../anonejs/queryInfo";
import { queryAllDataOfAllModels } from "../../../anonejs/queryInfo";
// import { queryAllContracts } from "../../../anonejs/queryInfo";
import { queryOfferingListByPriceRange } from "../../../anonejs/queryInfo";
import { queryOfferingListOfCollection } from "../../../anonejs/queryInfo";
import { queryOfferingListOfSeller } from "../../../anonejs/queryInfo";
import { queryCollectionInfo } from "../../../anonejs/queryInfo";
// import { getDataFromUri } from "../../../anonejs/getDataFromUri";
// import { getBase64, beforeUpload } from "../../../utils/imageProcessing";
import { modifyCollectionInfo } from "../../../anonejs/modifyCollectionInfo";
import {burnNft} from "../../../anonejs/burnNft";
import {transferNft} from "../../../anonejs/transferNft";
import noImg from "../../../assets/img/no_image.png";
import "./Forms.css";
import { mintCallFromUser } from "../../../anonejs/mintNft";

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

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [paymentAddr, setPaymentAddr] = useState(JSON.parse(account).account.address)
    const [share, setShare] = useState(0)

    const create = async (values) => {
        setLoading(true)
        const logo = await ipfsUpload(imgUrlLogo)
        const banner = await ipfsUpload(imgUrlBanner)
        let config = {
            ...values,
            logo: logo,
            banner: banner,
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
        createCollection(contractConfig).then(result => {
            console.log(result)
            openNotification('success', 'Submit successfully')
            reset()
        }).catch(e => {
            openNotification('error', e.message)
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
    // const result = await queryCollectionInfo('one1xmacmeqhdcr5w6qn2jpx8vs6kg3zaql944t4365jdsr8d8m67vns5mamhw');
    // const result = await getDataFromUri('https://ipfs.io/ipfs/bafybeiaivv62j7jxlkahxobfr5io7h2j56obw5mojljho2ybg7zhah2eue/galaxyfcnCU3/1');
    // const result = await queryAllDataOfAllModels('one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq');
    // const result = await queryAllDataOfAllNfts('one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq');
    // const result = await queryAllContracts(69);
    // const result = await queryOfferingListByPriceRange(Config9);
    // const result = await queryOfferingListOfCollection(Config10);
    // const result = await queryOfferingListOfSeller(Config11);
    // const result = await mintCallFromUser(Config12);
    // const result = await burnNft(Config13);
    // const result = await transferNft(Config14)
    // const result = await modifyCollectionInfo(Config15);
    // console.log(result);
  };

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
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
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
                            width: '20%',
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
                                style={{
                                    aspectRatio: '1/1',
                                    borderRadius: '50%',
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
                            width: '35%',
                            backgroundColor: '#626262',
                            aspectRatio: '2/1',
                            overflow: "hidden",
                            borderRadius: '10px'
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
                                style={{
                                    position: 'relative',
                                    top: '-30px'
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
                        marginTop: '50px'
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
                            width: '20%',
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
                        Create
                    </button>
                </div>
            </Form>
        </div >
    );
};

export default Forms;
