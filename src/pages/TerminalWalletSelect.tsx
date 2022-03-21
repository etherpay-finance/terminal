import {TerminalSimpleLayout} from "./layouts/TerminalSimpleLayout";
import {Box, Button, Container, Text} from "@chakra-ui/react";
import {useLocalStorage} from "../utils/useLocalStorage";
import {useWeb3Context} from "../utils/Web3Context";
import {useCallback, useEffect} from "react";
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
            console.log("eth:", window.ethereum);
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();

            // Subscribe to accounts change
            // @ts-ignore
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
                provider.emit("accountsChanged", accounts);
            });

            // Subscribe to chainId change
            // @ts-ignore
            window.ethereum.on("chainChanged", (chainId: number) => {
                provider.emit("chainChanged", chainId);
            });

            // Subscribe to session disconnection
            // @ts-ignore
            window.ethereum.on("disconnect", (code: number, reason: string) => {
                provider.emit("disconnect", code, reason);
            });

            web3Context.setSigner(signer);
            web3Context.setWallet("metamask");
            setStoredWeb3Provider("metamask");

            console.log("Provider:", signer.provider);
            console.log("Signer:", signer);
        }

        initialize();
    }, [web3Context, storedWeb3Provider]);

    useEffect(() => {
        if (storedWeb3Provider === "metamask") {
            onMetamaskSelect();
        }
    });

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