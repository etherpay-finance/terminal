import {useCallback, useEffect, useState} from "react";
import {VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalNumPad} from "../components/terminal/TerminalNumPad";
import * as React from "react";

export const Terminal = () => {
    const [amount, setAmount] = useState('0');
    const [secondAmount, setSecondAmount] = useState('0');

    useEffect(() => {
        const exchangeRate = 3100;
        setSecondAmount((parseFloat(amount) / exchangeRate).toString())
    }, [amount]);

    const onAmountUpdated = useCallback((amount: string): void => {
        setAmount(amount);
    }, [amount])

    const onConfirm = useCallback((): void => {

    }, [amount, secondAmount])

    return <VStack spacing={8}>
        <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}/>
        <TerminalNumPad onAmountUpdated={onAmountUpdated} onConfirm={onConfirm}/>
    </VStack>
}