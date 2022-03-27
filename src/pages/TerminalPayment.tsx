import {Box, Button, Container, HStack, useColorModeValue, VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalLayout} from "./layouts/TerminalLayout";
import * as React from "react";
import QRCode from "react-qr-code";
import {useLocation, useNavigate} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {useCallback, useEffect, useState} from "react";
import {useWeb3Context} from "../utils/Web3Context";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const TerminalPayment = (props: {}) => {
    const fgColor = useColorModeValue("#2D3748", "#E2E8F0")
    const bgColor = useColorModeValue("#FFFFFF", "#1A202C")
    const beatLoaderColor = useColorModeValue("black", "white")

    const navigate = useNavigate();
    const query = useQuery();

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
                {
                    recipientAddress.length !== 0 && chainId ?
                        <QRCode value={
                                    "ethereum:" + recipientAddress + "@" + chainId.toString() + "?value=" + secondAmount + "e18"
                                }
                                fgColor={fgColor}
                                bgColor={bgColor}
                        />
                        :
                        <BeatLoader size={8} color={beatLoaderColor} />
                }
            </Box>
            <Container >
                <Button mt={5} isFullWidth size='lg' colorScheme='red' variant='solid' onClick={cancel}>
                    Cancel
                </Button>
            </Container>
        </VStack>
    </TerminalLayout>
}