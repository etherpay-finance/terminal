import {createContext, ReactElement, useCallback, useContext, useEffect, useState} from 'react';

import {ethers, Signer, VoidSigner} from "ethers";

import * as React from "react";
import { useLocalStorage } from './useLocalStorage';

const internalWeb3Context = createContext(undefined as unknown as Web3ContextInterface);

const networkDeffinitions: {[key: number]: any} = {
    1: {
        chainId: '0x01',
        chainName: 'Ethereum',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        blockExplorerUrls: ['https://etherscan.io']
    },
    10: {
        chainId: '0xa',
        chainName: 'Optimism',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://mainnet.optimism.io'],
        blockExplorerUrls: ['https://optimistic.etherscan.io']
    },
    42161: {
        chainId: '0x' + (42161).toString(16),
        chainName: 'Arbitrum',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io']
    },
}

export interface Web3ContextInterface {
    provider?: ethers.providers.Web3Provider;
    signer?: Signer;
    wallet?: string;
    network?: number;
    listener?: () => void;

    setNetwork: (network?: number) => void

    onSetProvider: (provider?: ethers.providers.Web3Provider) => void;
    onSetSigner: (signer?: Signer) => void;
    onSetWallet: (wallet?: string) => void;
    onSetNetwork: (network?: number) => void;
    setListener: (listener: () => void) => void;
}

class Web3ContextClass implements Web3ContextInterface {
    provider: ethers.providers.Web3Provider | undefined
    signer: Signer | undefined;
    wallet: string | undefined;
    network: number | undefined;
    listener: (() => void) | undefined;

    setNetwork(network?: number): void {
        const thiz = this
        async function selectNetwork() {
            let error = false;

            try {
                await thiz.provider?.send(
                    'wallet_switchEthereumChain',
                    [{ chainId: '0x' + network?.toString(16) }],
                );
            } catch (switchError: any) {
                error = true
                console.log(switchError)
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902 || switchError.data?.originalError?.code === 4902) {
                    console.log(networkDeffinitions[network ? network : 0])
                    if (networkDeffinitions[network ? network : 0]) {
                        error = false
                        try {
                            await thiz.provider?.send(
                                'wallet_addEthereumChain',
                                [networkDeffinitions[network ? network : 0]]
                            );
                        } catch (addError) {
                            console.log("error", addError)
                            error = true
                        }
                    }
                }
            }

            if (!error) {
                thiz.network = network;

                if (thiz.listener !== undefined) {
                    thiz.listener();
                }
            }
        }

        void selectNetwork()
    }

    onSetProvider(provider?: ethers.providers.Web3Provider): void {
        this.provider = provider;

        if (this.listener !== undefined) {
            this.listener();
        }
    }

    onSetSigner(signer?: Signer): void {
        this.signer = signer;

        if (this.listener !== undefined) {
            this.listener();
        }
    }

    onSetWallet(wallet?: string): void {
        this.wallet = wallet;

        if (this.listener !== undefined) {
            this.listener();
        }
    }

    onSetNetwork(network?: number): void {
        this.network = network;

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
    const [storedWeb3Provider, setStoredWeb3Provider] = useLocalStorage("provider", undefined as unknown as string);

    web3Context.setListener(() => {
        console.log("OnChange:", web3Context);
        const newWeb3Context = new Web3ContextClass() as Web3ContextInterface
        newWeb3Context.provider = web3Context.provider;
        newWeb3Context.signer = web3Context.signer;
        newWeb3Context.wallet = web3Context.wallet;
        newWeb3Context.network = web3Context.network;
        newWeb3Context.listener = web3Context.listener;

        if (!newWeb3Context.wallet) {
            setStoredWeb3Provider(undefined);
        }

        setWeb3Context(newWeb3Context);
    });

    const onAccountsChanged = useCallback((accounts: string[]) => {
        console.log("AccountsChanged:", accounts);

        if (accounts.length === 0) {
            console.log("Clear");
            setWalletSelected(false);
            setWeb3Context(new Web3ContextClass() as Web3ContextInterface);
            setStoredWeb3Provider(undefined);
        }
    }, []);

    const onChainChangedCallback = useCallback((chainIdStr: string) => {
        const chainId = parseInt(chainIdStr, 16)

        console.log("ChainChanged:", chainId);
        web3Context.onSetNetwork(chainId);
    }, []);

    const onDisconnect = useCallback((code: number, reason: string) => {
        console.log("Disconnect:", code, reason);
    }, []);

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

            web3Context.signer.provider.off("accountsChanged");
            web3Context.signer.provider.off("chainChanged");
            web3Context.signer.provider.off("disconnect");

            web3Context.signer.provider.on("accountsChanged", onAccountsChanged);
            web3Context.signer.provider.on("chainChanged", onChainChangedCallback);
            web3Context.signer.provider.on("disconnect", onDisconnect);
        }

        fetchData();
    }, [isWalletSelected, web3Context, onAccountsChanged, onChainChangedCallback, onDisconnect])

    return <internalWeb3Context.Provider value={web3Context}>
        { !isWalletSelected ? props.walletSelection : props.children }
    </internalWeb3Context.Provider>
}
