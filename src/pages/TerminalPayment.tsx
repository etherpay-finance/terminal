import {Box, Button, useColorModeValue, VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/TerminalScreen";
import {TerminalLayout} from "./layouts/TerminalLayout";
import * as React from "react";
import QRCode from "react-qr-code";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useWeb3Context} from "../utils/Web3Context";
import LogRocket from "logrocket";
import {BigNumber, ethers} from "ethers";
import { BiCheckCircle } from "react-icons/bi";
import useKeyPress from "../utils/useKeyPress";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const TerminalPayment = (props: {}) => {
    const fgColor = useColorModeValue("#2D3748", "#E2E8F0");
    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const checkColor = useColorModeValue("#38B2AC", "#4FD1C5");

    const navigate = useNavigate();
    const query = useQuery();

    const [isConfirmed, setConfirmed] = useState(false);
    const [balance, setBalance] = useState(undefined as unknown as BigNumber);

    const web3Context = useWeb3Context();

    // @ts-ignore
    let amount: string = query.get("amount") !== null ? query.get("amount") : ""
    if (!amount) {
        navigate("/");
    }

    // @ts-ignore
    let secondAmount: string = query.get("secondAmount") !== null ? query.get("secondAmount") : ""
    if (!secondAmount) {
        navigate("/");
    }

    // @ts-ignore
    let chainId: string = query.get("chainId") !== null ? query.get("chainId") : ""
    if (!chainId) {
        navigate("/");
    }

    // @ts-ignore
    let to: string = query.get("to") !== null ? query.get("to") : ""
    if (!to) {
        navigate("/");
    }

    const onBalanceUpdate = useCallback(async () => {
        const newBalance = await web3Context.signer?.getBalance();
        if (!newBalance) {
            return;
        }

        if (balance === undefined) {
            setBalance(newBalance);
        }

        if (balance && newBalance && newBalance.eq(balance.add(ethers.utils.parseUnits(secondAmount)))) {
            setConfirmed(true);
        }
    }, [balance])

    useEffect(() => {
        LogRocket.startNewSession();
        LogRocket.track("OpenTerminalPaymentPage");
        if (web3Context.wallet != null) {
            LogRocket.identify(web3Context.wallet, {});
        }
    }, [])

    useEffect(() => {
        const timer = setInterval(onBalanceUpdate, 1000);
        return () => clearInterval(timer);
    }, [onBalanceUpdate])

    const cancel = useCallback(function () {
        navigate("/");
    }, [navigate]);

    useKeyPress(
        ['Backspace', 'Enter'],
        (event: KeyboardEvent) => {
            if (isConfirmed) {
                event.key === 'Enter' && cancel()
            } else {
                event.key === 'Backspace' && cancel()
            }
        }
    );

    return <TerminalLayout>
            {!isConfirmed ?
                <VStack spacing={5}>
                    <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}
                                    isNetworkSwitcherDisabled={true}/>
                    <Box>
                        <QRCode value={
                            "ethereum:" + to + "@" + chainId.toString() + "?value=" + ethers.utils.parseUnits(secondAmount).toString() + ""
                        }
                                fgColor={fgColor}
                                bgColor={bgColor}
                        />

                        <Button my={5} isFullWidth size='lg' colorScheme='red' variant='solid' onClick={cancel}>
                            Cancel
                        </Button>
                    </Box>
                </VStack>
                :
                <VStack spacing={5}>
                    <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}
                                    isNetworkSwitcherDisabled={true}/>
                    <Box>
                        <BiCheckCircle size={250} color={checkColor}/>

                        <Button my={5} isFullWidth size='lg' colorScheme='teal' variant='solid' onClick={cancel}>
                            Done
                        </Button>
                    </Box>
                </VStack>
            }
    </TerminalLayout>
}
