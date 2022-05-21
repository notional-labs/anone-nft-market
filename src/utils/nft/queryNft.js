import axios from "axios";
import { queryNftInfoById, queryOfferingList } from "../../anonejs/queryInfo";

export const getMarketplaceNft = async (sortListing = 'newest_listed') => {
    const configMarketplace = {
        nftMarketplaceContractAddr:
            "one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw",
        sortListing: sortListing
    };
    let list = await queryOfferingList(configMarketplace)
    console.log(list)
    return list
}

export const getInfo = async (nft) => {
    const configNft = {
        cw721ContractAddr: nft.contract_addr,
        tokenId: nft.token_id
    };
    const info = await queryNftInfoById(configNft)
    const { data } = await axios.get(`https://ipfs.io/ipfs/${info.token_uri.split('ipfs://')[1]}`);
    return {
        ...info,
        ...nft,
        metaData: data
    }
}