import {ColorModeSwitcher} from "../buttons/ColorModeSwitcher";
import * as React from "react";
import {Text, Box, Flex, Spacer, IconButton, Menu, MenuButton, MenuList, MenuItem, Icon} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {FaCog, FaEquals, FaHistory, FaWallet, FaDoorOpen} from "react-icons/all";
import {useWeb3Context} from "../../utils/Web3Context";
import {useEffect, useState} from "react";

export const TerminalHeader = () => {
    const web3Context = useWeb3Context();

    const [wallet, setWallet] = useState("");

    useEffect(() => {
        async function fetchData() {
            if (web3Context === undefined || web3Context.signer === undefined) {
                return;
            }

            const wallet = await web3Context.signer.getAddress();
            setWallet(wallet);
        }

        fetchData();
    }, [web3Context])

    return <Flex>
        <Logo text="Terminal" />
        <Spacer />
        <Box>
            <Menu>
                <MenuButton
                    as={IconButton}
                    size="md"
                    fontSize="lg"
                    variant="ghost"
                    color="current"
                    aria-label="Settings"
                    icon={<FaEquals />}>
                </MenuButton>
                <MenuList>
                    <Flex>
                        <Icon
                            size="md"
                            color="current"
                            aria-label="Wallet Address"
                            ml={4}
                            mt={2}
                            mb={2}
                            as={FaWallet} />
                        <Spacer />
                        <Text fontSize={"sm"} fontWeight={"semibold"} m={2} marginRight={4}>{wallet}</Text>
                    </Flex>
                    <Flex>
                        <IconButton
                            size="md"
                            fontSize="sm"
                            color="current"
                            variant="ghost"
                            marginLeft={2}
                            aria-label={"Transaction History"}
                            icon={<FaHistory />}/>
                        <ColorModeSwitcher justifySelf="flex-end" size={"md"}/>
                        <Spacer />
                        <IconButton
                            size="md"
                            fontSize="sm"
                            colorScheme="red"
                            variant="ghost"
                            marginLeft={2}
                            marginRight={2}
                            aria-label={"Transaction History"}
                            icon={<FaDoorOpen />}/>
                    </Flex>
                </MenuList>
            </Menu>
        </Box>
    </Flex>
}