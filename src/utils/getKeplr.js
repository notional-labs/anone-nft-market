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

export const dummyConnectWallet = async (addr) => {
    const { accounts } = await getKeplr()
    const user = dummyLogin()
    !localStorage.getItem('account') && localStorage.setItem('account', {
        accounts,
        user
    })
}
