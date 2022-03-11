import {createContext, useCallback, useEffect, useState} from 'react';

import {ethers, Signer} from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Network } from "@ethersproject/networks";

import * as React from "react";

const internalWeb3Context = createContext(undefined as unknown as Provider);

export const Web3Context = (props: {
    children: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined;
    }) => {
    const [provider, setProvider] = useState(undefined as unknown as Provider)
    const [signer, setSigner] = useState(undefined as unknown as Signer)
    const [network, setNetwork] = useState(undefined as unknown as Network)

    const onNetworkChangeCallback = useCallback((oldNetwork, newNetwork) => {
        console.log("Network:", newNetwork);
    }, [])

    useEffect(() => {
        // @ts-ignore
        if (provider === undefined && window.ethereum !== undefined) {
            // @ts-ignore
            window.ethereum.enable();
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            setProvider(provider);
            setSigner(signer);

            console.log("Provider:", provider);
            console.log("Signer:", signer)
        }
    })

    useEffect(() => {
        async function fetchData() {
            if (provider === undefined) {
                return;
            }

            provider.off("network");

            let network = await provider.getNetwork();
            setNetwork(network);
            provider.on("network", onNetworkChangeCallback);

            console.log("Network:", network);
        }

        fetchData();
    }, [provider])


    return <internalWeb3Context.Provider value={provider}>
        { props.children }
    </internalWeb3Context.Provider>
}