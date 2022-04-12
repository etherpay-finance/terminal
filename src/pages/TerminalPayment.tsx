import {Box, Button, Container, HStack, useColorModeValue, VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalLayout} from "./layouts/TerminalLayout";
import * as React from "react";
import QRCode from "react-qr-code";
import {useLocation, useNavigate} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {useCallback, useEffect, useState} from "react";
import {useWeb3Context} from "../utils/Web3Context";
import LogRocket from "logrocket";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const TerminalPayment = (props: {}) => {
    const fgColor = useColorModeValue("#2D3748", "#E2E8F0")
    const bgColor = useColorModeValue("#FFFFFF", "#1A202C")

    const navigate = useNavigate();
    const query = useQuery();

    const web3Context = useWeb3Context();

    useEffect(() => {
        LogRocket.startNewSession();
        LogRocket.track("OpenTerminalPaymentPage");
        if (web3Context.wallet != null) {
            LogRocket.identify(web3Context.wallet, {});
        }
    }, [])

    const cancel = useCallback(function () {
        navigate("/");
    }, [navigate]);

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

    return <TerminalLayout>
        <VStack spacing={5}>
            <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}/>
            <Box>
                <QRCode value={
                            "ethereum:" + to + "@" + chainId.toString() + "?value=" + secondAmount + "e18"
                        }
                        fgColor={fgColor}
                        bgColor={bgColor}
                />
            </Box>
            <Container>
                <Button mt={0} isFullWidth size='lg' colorScheme='red' variant='solid' onClick={cancel}>
                    Cancel
                </Button>
            </Container>
        </VStack>
    </TerminalLayout>
}