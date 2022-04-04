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
        const offlineSigner = window.keplr.getOfflineSigner(process.env.REACT_APP_CHAIN_ID);
        const accounts = await offlineSigner.getAccounts();
        accounts.chain = process.env.REACT_APP_CHAIN_ID
        return {
            accounts,
            offlineSigner,
        };
    }
}

export const dummyConnectWallet = async () => {
    const { accounts } = await getKeplr()
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
}
