import {createContext, ReactElement, useCallback, useContext, useEffect, useState} from 'react';

import {ethers, Signer, VoidSigner} from "ethers";

import * as React from "react";
import { useLocalStorage } from './useLocalStorage';

const internalWeb3Context = createContext(undefined as unknown as Web3ContextInterface);

interface Web3ContextInterface {
    signer?: Signer;
    wallet?: string;
    listener?: () => void;

    setSigner: (signer: Signer) => void;
    setWallet: (wallet: string) => void;
    setListener: (listener: () => void) => void;
}

class Web3ContextClass implements Web3ContextInterface {
    signer: Signer | undefined;
    wallet: string | undefined;
    listener: (() => void) | undefined;

    setSigner(signer: Signer): void {
        this.signer = signer;

        if (this.listener !== undefined) {
            this.listener();
        }
    }

    setWallet(wallet: string): void {
        this.wallet = wallet;

        if (this.listener !== undefined) {
            this.listener();
        }
    }

    setListener(listener: () => void): void {
        this.listener = listener;
    }
}

export const useWeb3Context = (): Web3ContextInterface => {
  return useContext(internalWeb3Context);
}

export const Web3Context = (props: {
    children: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined;
    walletSelection: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined;
}) => {
    const [isWalletSelected, setWalletSelected] = useState(false);

    const [web3Context, setWeb3Context] = useState(new Web3ContextClass() as Web3ContextInterface);

    web3Context.setListener(() => {
        console.log("OnChange:", web3Context);
        const newWeb3Context = new Web3ContextClass() as Web3ContextInterface
        newWeb3Context.signer = web3Context.signer;
        newWeb3Context.wallet = web3Context.wallet;
        newWeb3Context.listener = web3Context.listener;

        setWeb3Context(newWeb3Context);
    })

    const onNetworkChangeCallback = useCallback((newNetwork, oldNetwork) => {
        console.log("Network:", newNetwork);
    }, [])

    useEffect(() => {
        console.log("OnWalletSelected: ", web3Context.wallet);
        if (web3Context.wallet === undefined) {
            setWalletSelected(false);
        } else {
            setWalletSelected(true);
        }
    }, [web3Context]);

    useEffect(() => {
        async function fetchData() {
            if (!isWalletSelected || web3Context === undefined || web3Context.signer === undefined
                  || web3Context.signer.provider === undefined) {
                return;
            }

            web3Context.signer.provider.off("network");

            let network = await web3Context.signer.provider.getNetwork();
            web3Context.signer.provider.on("network", onNetworkChangeCallback);

            console.log("Network:", network);
        }

        fetchData();
    }, [isWalletSelected, web3Context, onNetworkChangeCallback])

    return <internalWeb3Context.Provider value={web3Context}>
        { !isWalletSelected ? props.walletSelection : props.children }
    </internalWeb3Context.Provider>
}