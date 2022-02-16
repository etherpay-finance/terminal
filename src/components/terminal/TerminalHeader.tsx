import {ColorModeSwitcher} from "../buttons/ColorModeSwitcher";
import * as React from "react";
import {Text, Box, Flex, Spacer, IconButton, Menu, MenuButton, MenuList, MenuItem, Icon} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {FaCog, FaEquals, FaHistory, FaWallet, FaDoorOpen} from "react-icons/all";

export const TerminalHeader = () => {
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
                        <Text fontSize={"sm"} fontWeight={"semibold"} m={2} marginRight={4}>0x5c2245ff2342124a3</Text>
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