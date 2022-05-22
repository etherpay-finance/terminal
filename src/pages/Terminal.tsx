import {useCallback, useEffect, useState} from "react";
import {VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalNumPad} from "../components/terminal/TerminalNumPad";
import * as React from "react";
import { TerminalLayout } from "./layouts/TerminalLayout";
import {useNavigate} from "react-router-dom";
import {useWeb3Context, Web3ContextInterface} from "../utils/Web3Context";
import {TokenPair} from "../utils/PriceOracle";
import LogRocket from "logrocket";
import ChainlinkOracle from "../utils/chainlinkOracle";

async function getExchangeRate(web3Context: Web3ContextInterface) {
    if (!web3Context || !web3Context.signer || !web3Context.signer.provider) {
        return;
    }

    const oracle = new ChainlinkOracle(web3Context.signer.provider);
    return await oracle.price(new TokenPair('ETH', 'USD'));
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

        LogRocket.startNewSession();
        LogRocket.track("OpenTerminalPage");
        if (web3Context.wallet != null) {
            LogRocket.identify(web3Context.wallet, {});
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
        console.log(amount)
        setAmount(amount);
    }, [amount])

    const onConfirm = useCallback((): void => {
        console.log(amount)
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
