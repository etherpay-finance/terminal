import {createContext, useCallback, useContext, useEffect, useState} from 'react';

import {ethers, Signer} from "ethers";

import * as React from "react";
import { useLocalStorage } from './useLocalStorage';

const internalWeb3Context = createContext(undefined as unknown as Web3ContextInterface);

interface Web3ContextInterface {
    signer: Signer;
}

export const useWeb3Context = (): Web3ContextInterface => {
  return useContext(internalWeb3Context);
}

export const Web3Context = (props: {
    children: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined;
    }) => {
    const [web3Context, setWeb3Context] = useState(undefined as unknown as Web3ContextInterface);
    const [storedWeb3Provider, setStoredWeb3Provider] = useLocalStorage("provider", undefined as unknown as string);

    const onNetworkChangeCallback = useCallback((newNetwork, oldNetwork) => {
        console.log("Network:", newNetwork);
    }, [])

    useEffect(() => {
        // @ts-ignore
        if (web3Context === undefined && window.ethereum !== undefined) {
            // @ts-ignore
            const reqAcc = window.ethereum.send('eth_requestAccounts');
            console.log("req acc:", reqAcc);
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            setWeb3Context({signer: signer})

            console.log("Provider:", signer.provider);
            console.log("Signer:", signer)
        }
    })

    useEffect(() => {
        async function fetchData() {
            if (web3Context === undefined || web3Context.signer === undefined || web3Context.signer.provider === undefined) {
                return;
            }

            web3Context.signer.provider.off("network");

            let network = await web3Context.signer.provider.getNetwork();
            web3Context.signer.provider.on("network", onNetworkChangeCallback);

            console.log("Network:", network);
        }

        fetchData();
    }, [web3Context, onNetworkChangeCallback])


    return <internalWeb3Context.Provider value={web3Context}>
        { props.children }
    </internalWeb3Context.Provider>
}