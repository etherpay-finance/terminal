import {useCallback, useEffect, useState} from "react";
import {VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalNumPad} from "../components/terminal/TerminalNumPad";
import * as React from "react";
import { TerminalLayout } from "./layouts/TerminalLayout";
import {useNavigate} from "react-router-dom";
import {useWeb3Context} from "../utils/Web3Context";
import { UniswapV3Oracle } from "../utils/uniswapV3Oracle";
import {TokenPair} from "../utils/PriceOracle";

export const Terminal = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('0');
    const [secondAmount, setSecondAmount] = useState('0');

    const web3Context = useWeb3Context();

    useEffect(() => {
        async function fetchData() {
            if (!web3Context || !web3Context.signer || !web3Context.signer.provider) {
                return
            }

            const chainId = await web3Context.signer.getChainId();
            const tokensByChainId = {
                1: {
                    token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    token2: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    inverse: false
                },
                10: {
                    token1: "0x4200000000000000000000000000000000000006",
                    token2: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
                    inverse: true
                },
                42161: {
                    token1: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
                    token2: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
                    inverse: true
                }
            }

            const oracle = new UniswapV3Oracle(web3Context.signer.provider);
            // @ts-ignore
            const token1 = tokensByChainId[chainId].token1;
            // @ts-ignore
            const token2 = tokensByChainId[chainId].token2;
            // @ts-ignore
            const inverse = tokensByChainId[chainId].inverse

            let exchangeRate = await oracle.price(
                new TokenPair(token1, token2)
            );

            if (inverse) {
                exchangeRate = (1 / parseFloat(exchangeRate)).toString()
            }

            console.log("exch:", exchangeRate);
            setSecondAmount((parseFloat(amount) / parseFloat(exchangeRate)).toString());
        }

        fetchData();
    }, [amount]);

    const onAmountUpdated = useCallback((amount: string): void => {
        setAmount(amount);
    }, [amount])

    const onConfirm = useCallback((): void => {
        navigate("payment?amount=" + amount + "&secondAmount=" + secondAmount);
    }, [amount, secondAmount])

    return <TerminalLayout>
        <VStack spacing={8}>
            <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}/>
            <TerminalNumPad onAmountUpdated={onAmountUpdated} onConfirm={onConfirm}/>
        </VStack>
    </TerminalLayout>
}