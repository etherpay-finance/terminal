import {TerminalSimpleLayout} from "./layouts/TerminalSimpleLayout";
import {Box, Button, Container, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {useLocalStorage} from "../utils/useLocalStorage";
import {useWeb3Context} from "../utils/Web3Context";
import {useCallback, useEffect} from "react";
import {ethers} from "ethers";
import { GiReceiveMoney } from "react-icons/gi";
import LogRocket from "logrocket";

export const TerminalWalletSelect = () => {
    const web3Context = useWeb3Context();

    const [storedWeb3Provider, setStoredWeb3Provider] = useLocalStorage("provider", undefined as unknown as string);

    const terminalColor = useColorModeValue("gray.900", "white")
    const iconColor = useColorModeValue("#4A5568", "#A0AEC0")
    const textColor = useColorModeValue("gray.600", "gray.400")

    const onMetamaskSelect = useCallback(() => {
        async function initialize() {
            if (web3Context === undefined) {
                return;
            }

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();

            await provider.send('eth_requestAccounts', []);

            // Subscribe to accounts change
            // @ts-ignore
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length === 0) {
                    setStoredWeb3Provider(undefined);
                }

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
            web3Context.setWallet(await signer.getAddress());
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

        LogRocket.startNewSession();
        LogRocket.track("OpenTerminalHomePage");
    }, []);

    return <TerminalSimpleLayout>
        <Container>
            <Box my={5}>
                <Container align={"center"}>
                    <GiReceiveMoney color={iconColor} fontSize={124}/>
                </Container>
            </Box>
            <Box m={[5, 5, 5, 5]}>
                <Text color={textColor} fontSize={'lg'} fontWeight={'bold'}>
                    „Accepting crypto payments has never been easier. Download <Link href='https://metamask.io/'color={"orange.400"} isExternal>Metamask</Link> on your mobile device, create your
                     wallet, open the <Link href='#' color={terminalColor} isExternal>Ξ Terminal</Link> and start accepting payments at fractions of the cost.”
                </Text>
            </Box>
            <Box mt={5}>
                <Text fontSize={'lg'} fontWeight={'bold'}>Please select Wallet</Text>
            </Box>
            <Box mt={5}>
                <Button size={'lg'} onClick={onMetamaskSelect}>Metamask</Button>
            </Box>
        </Container>
    </TerminalSimpleLayout>
}
