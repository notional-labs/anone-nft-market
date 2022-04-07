import { collections } from "../../data/dummyData/collections"

export const getCollectionById = () => {
    const col = collections.filter(x => x.id === 2)
    return col[0]
}