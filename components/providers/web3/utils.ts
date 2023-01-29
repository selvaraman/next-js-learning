import { setupHooks, web3Hooks } from "@hooks/web3/setUpHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Dependencies } from "@_types/hooks";
import { Contract, ethers, providers } from "ethers";

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider
    }
}

type Nullable<T> = {
    [P in keyof T]: T[P] | null
}

export type web3State = {
    isLoading: boolean;
    hooks: web3Hooks
} & Nullable<Web3Dependencies>

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks({} as any)
    }
}

export const createWeb3State = ({
    ethereum, provider, contract, isLoading
}: Web3Dependencies & {isLoading: boolean}) => {
    return {
        ethereum,
        provider,
        contract,
        isLoading,
        hooks: setupHooks({ethereum, provider, contract} as any)
    }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
export const loadContract = async (
    name: string,
    provider: providers.Web3Provider
): Promise<Contract> => {
    if(!NETWORK_ID) {
        return Promise.reject("Network ID not found");
    }
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();
    if(Artifact.networks[NETWORK_ID].address) {
        const contract = new ethers.Contract(
            Artifact.networks[NETWORK_ID].address,
            Artifact.abi,
            provider
        );
        return contract;
    } else {
        return Promise.reject("Address not found");
    }
}