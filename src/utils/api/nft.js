import { sneakers } from "../../data/dummyData/nft"

export const getNftById = () => {
    const nft = sneakers.filter(x => x.id === 2)
    return nft[0]
}