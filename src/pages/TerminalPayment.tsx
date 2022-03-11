import {Box, Button, Container, HStack, useColorModeValue, VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalLayout} from "./layouts/TerminalLayout";
import * as React from "react";
import QRCode from "react-qr-code";
import {useLocation, useNavigate} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {useCallback} from "react";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const TerminalPayment = (props: {}) => {
    const fgColor = useColorModeValue("#2D3748", "#E2E8F0")
    const bgColor = useColorModeValue("#FFFFFF", "#1A202C")
    const navigate = useNavigate();
    const query = useQuery();

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

    return <TerminalLayout>
        <VStack spacing={8}>
            <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}/>
            <Box>
                <QRCode value={"ethereum:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359@1?value=" + secondAmount + "e18"}
                        fgColor={fgColor}
                        bgColor={bgColor}
                />
            </Box>
            <BeatLoader size={8} color='white' />
            <Container>
                <Button isFullWidth size='lg' colorScheme='red' variant='solid' onClick={cancel}>
                    Cancel
                </Button>
            </Container>
        </VStack>
    </TerminalLayout>
}