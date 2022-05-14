import axios from 'axios'

const api = process.env.REACT_APP_API

export const getBalance = async (addr) => {
    const URL = `${api}bank/balances/${addr}`
    const res= await axios.get(URL)
    return res.data.result
}