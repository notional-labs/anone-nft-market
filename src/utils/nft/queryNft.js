import axios from "axios";
import { queryNftInfoById, queryOfferingList, queryOfferingListOfCollection } from "../../anonejs/queryInfo";

export const getMarketplaceNft = async (sortListing = 'newest_listed') => {
    try {
        const configMarketplace = {
            nftMarketplaceContractAddr: process.env.REACT_APP_MARKETPLACE_ADDRESS,
            sortListing: sortListing
        };
        let list = await queryOfferingList(configMarketplace)
        return list
    }
    catch {
        return []
    }
}

export const getCollectionNfts = async (addr, sortListing = 'newest_listed') => {
    try {
        const config = {
            nftMarketplaceContractAddr: process.env.REACT_APP_MARKETPLACE_ADDRESS,
            sortListing: sortListing,
            collectionAddr: addr
        }
        const list = await queryOfferingListOfCollection(config)
        return list
    }
    catch (e) {
        console.log(e.message)
        return []
    }
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

export const getListPrice = async (contractAddr, tokenId) => {
    try {
        const configMarketplace = {
            nftMarketplaceContractAddr: process.env.REACT_APP_MARKETPLACE_ADDRESS,
            sortListing: 'newest_listed'
        };
        const list = await queryOfferingList(configMarketplace)
        const filterList = list.filter(x => x.contract_addr === contractAddr && x.token_id === tokenId)
        const searchNft = filterList.length > 0 && filterList[0]
        return searchNft ? parseInt(searchNft.list_price) / 1000000 : 0
    }
    catch {
        return 0
    }
}