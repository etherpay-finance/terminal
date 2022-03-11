import {createContext, useCallback, useEffect, useState} from 'react';

import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import * as React from "react";

const internalWeb3Context = createContext(undefined as unknown as Provider);

export const Web3Context = (props: {
    children: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined;
    }) => {
    const [provider, setProvider] = useState(undefined as unknown as Provider)

    const onNetworkChangeCallback = useCallback((oldNetwork, newNetwork) => {
        console.log("Network:", newNetwork);
    }, [])

    useEffect(() => {
        // @ts-ignore
        if (provider === undefined && window.ethereum !== undefined) {
            // @ts-ignore
            window.ethereum.enable();
            // @ts-ignore
            setProvider(new ethers.providers.Web3Provider(window.ethereum, "any"));
        }
    })

    useEffect(() => {
        async function fetchData() {
            let network = await provider.getNetwork();
            console.log("Network:", network);

            provider.on("network", onNetworkChangeCallback);
        }

        fetchData();
    }, [])


    return <internalWeb3Context.Provider value={provider}>
        { props.children }
    </internalWeb3Context.Provider>
}