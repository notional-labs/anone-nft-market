import { queryNftInfoById, queryOfferingList } from "../../anonejs/queryInfo";
import { getDataFromUri } from "../../anonejs/getDataFromUri";

export const getMarketplaceNft = async (sortListing = 'price_lowest') => {
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
    const data = await getDataFromUri(info.token_uri)
    return {
        ...info,
        ...nft,
        data
    }
}