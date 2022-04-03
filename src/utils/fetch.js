import { collections } from '../data/dummyData/collections'
import { artists } from '../data/dummyData/artist'
import { sneakers } from '../data/dummyData/nft'

export const fetchDummyBestCollections = () => {
    return collections
}

export const fetchDummyTopArtists = () => {
    return artists
}

export const fetchDummyTopNft = () => {
    return sneakers
}