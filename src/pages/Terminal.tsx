import {useCallback, useEffect, useState} from "react";
import {VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalNumPad} from "../components/terminal/TerminalNumPad";
import * as React from "react";
import { TerminalLayout } from "./layouts/TerminalLayout";
import {useNavigate} from "react-router-dom";
import {useWeb3Context, Web3ContextInterface} from "../utils/Web3Context";
import { UniswapV3Oracle } from "../utils/uniswapV3Oracle";
import {TokenPair} from "../utils/PriceOracle";

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

async function getExchangeRate(web3Context: Web3ContextInterface) {
    if (!web3Context || !web3Context.signer || !web3Context.signer.provider) {
        return;
    }

    const chainId = await web3Context.signer.getChainId();

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
        exchangeRate = (1 / parseFloat(exchangeRate)).toString();
    }

    return exchangeRate;
}

export const Terminal = () => {
    const navigate = useNavigate();

    const [amount, setAmount] = useState('0');
    const [exchangeRate, setExchangeRate] = useState('0');
    const [exchangeRateUpdateTime, setExchangeRateUpdateTime] = useState(0);
    const [secondAmount, setSecondAmount] = useState('0');
    const [isLoading, setIsLoading] = useState(false);

    const web3Context = useWeb3Context();
    const [recipientAddress, setRecipientAddress] = useState("");
    const [chainId, setChainId] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const signer = web3Context.signer;
            if (!signer) {
                return;
            }

            const addr = await signer.getAddress();
            const chainId = await signer.getChainId();

            setRecipientAddress(addr);
            setChainId(chainId);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            let newExchangeRate = undefined;
            if (Date.now() - exchangeRateUpdateTime >= 30000) {
                newExchangeRate = await getExchangeRate(web3Context);
            }

            if (newExchangeRate) {
                setExchangeRate(newExchangeRate);
                setExchangeRateUpdateTime(Date.now());
                console.log("new exchange rate:", newExchangeRate);
            } else {
                newExchangeRate = exchangeRate;
            }

            if (newExchangeRate) {
                setSecondAmount((parseFloat(amount) / parseFloat(newExchangeRate)).toString());
            }
            setIsLoading(false);
        }

        setIsLoading(true);
        fetchData();
    }, [amount, exchangeRate, exchangeRateUpdateTime]);

    const onAmountUpdated = useCallback((amount: string): void => {
        setAmount(amount);
    }, [amount])

    const onConfirm = useCallback((): void => {
        navigate("payment?amount=" + amount + "&secondAmount=" + secondAmount + "&chainId=" + chainId.toString()
            + "&to=" + recipientAddress);
    }, [amount, secondAmount, recipientAddress, chainId])

    return <TerminalLayout>
        <VStack spacing={8}>
            <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'} isLoading={isLoading}/>
            <TerminalNumPad onAmountUpdated={onAmountUpdated} onConfirm={onConfirm} isLoading={isLoading}/>
        </VStack>
    </TerminalLayout>
}