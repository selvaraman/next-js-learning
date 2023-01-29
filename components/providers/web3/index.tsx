import { setupHooks } from "@hooks/web3/setUpHooks";
import { ethers } from "ethers";
import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { createDefaultState, createWeb3State, loadContract, web3State } from "./utils";
interface Props {
    children: React.ReactNode;
}

const Web3Context = createContext<web3State>(createDefaultState());
const Web3Provider: FunctionComponent<Props> = ({children}) => {
    const [web3Api, setWeb3Api] = useState<web3State>(createDefaultState());
    useEffect(() => {
        async function initWeb3() {
            const provider = new ethers.providers.Web3Provider(window.ethereum as any);
            const contract = await loadContract("NftMarket", provider);
            setWeb3Api(createWeb3State({
                ethereum: window.ethereum,
                provider,
                contract,
                isLoading: false
            }))
        }
        initWeb3();
    }, [])
    return(
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context);
}

export function useHooks() {
    const {hooks} = useWeb3();
    return hooks;
}

export default Web3Provider;