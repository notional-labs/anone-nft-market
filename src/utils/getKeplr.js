import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { anoneTestnetChain } from "../data/chainObjects/anone_testnet";
import { dummyLogin } from "./api/user";

export const getKeplr = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Keplr Wallet not detected, please install extension");
        return {
            accounts: null
        }
    } else {
        await window.keplr.experimentalSuggestChain(anoneTestnetChain)
        await window.keplr.enable(process.env.REACT_APP_CHAIN_ID)
        let offlineSigner = await window.getOfflineSigner(process.env.REACT_APP_CHAIN_ID);
        let accounts = await offlineSigner.getAccounts()
        accounts.chain = process.env.REACT_APP_CHAIN_ID
        return {
            accounts,
            offlineSigner,
        };
    }
}


export const getWasmClient = async (offlineSigner) => {
    const wasmClient = await SigningCosmWasmClient.connectWithSigner(anoneTestnetChain.rpc, offlineSigner);
    return wasmClient
}


export const dummyConnectWallet = async () => {
    const { accounts, offlineSigner } = await getKeplr()
    const wasmClient = await getWasmClient(offlineSigner)

    if(!accounts || accounts.length === 0) return
    const user = dummyLogin(accounts[0].address)

    if (localStorage.getItem('account') === null) {
        localStorage.setItem('account', JSON.stringify({
            account: accounts[0],
            user: user
        }))
    }
    else {
        localStorage.removeItem('account')
        localStorage.setItem('account', JSON.stringify({
            account: accounts[0],
            user: user
        }))
    }
    if (localStorage.getItem('wasmClient') === null) {
        localStorage.setItem('wasmClient', JSON.stringify({
            wasmClient: wasmClient
        }))
    }
    else {
        localStorage.removeItem('wasmClient')
        localStorage.setItem('wasmClient', JSON.stringify({
            wasmClient: wasmClient
        }))
    }
}
