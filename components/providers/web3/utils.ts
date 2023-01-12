import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider
    }
}

export type web3Params = {
    ethereum?: MetaMaskInpageProvider | null;
    provider?: providers.Web3Provider | null;
    contract?: Contract | null;
}

export type web3State = {
    isLoading: boolean;
} & web3Params

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true
    }
}