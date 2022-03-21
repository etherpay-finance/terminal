import {TerminalSimpleLayout} from "./layouts/TerminalSimpleLayout";
import {Box, Button, Container, Text} from "@chakra-ui/react";
import {useLocalStorage} from "../utils/useLocalStorage";
import {useWeb3Context} from "../utils/Web3Context";
import {useCallback} from "react";
import {ethers} from "ethers";

export const TerminalWalletSelect = () => {
    const web3Context = useWeb3Context();

    const [storedWeb3Provider, setStoredWeb3Provider] = useLocalStorage("provider", undefined as unknown as string);

    const onMetamaskSelect = useCallback(() => {
        async function initialize() {
            if (web3Context === undefined) {
                return;
            }

            // @ts-ignore
            const reqAcc = await window.ethereum.send('eth_requestAccounts');
            console.log("req acc:", reqAcc);
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();

            web3Context.setSigner(signer);
            web3Context.setWallet("metamask");

            console.log("Provider:", signer.provider);
            console.log("Signer:", signer);
        }

        initialize();
    }, [web3Context]);

    return <TerminalSimpleLayout>
        <Container>
            <Box mt={10}>
                <Text fontSize={'lg'} fontWeight={'bold'}>Please select Wallet</Text>
            </Box>
            <Box m={5}>
                <Button size={'lg'} onClick={onMetamaskSelect}>Metamask</Button>
            </Box>
        </Container>
    </TerminalSimpleLayout>
}