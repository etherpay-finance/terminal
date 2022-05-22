import * as React from "react";
import {Box, ButtonGroup, Flex, IconButton, Spacer} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {ColorModeSwitcher} from "../buttons/ColorModeSwitcher";
import {BiMenu, BiX} from "react-icons/all";

export const TerminalSimpleHeader = () => {
    return <Flex pl={2} pr={2}>
        <Logo text="Terminal" />
        <Spacer />
        <Box>
            <ColorModeSwitcher justifySelf="flex-end" size={"md"}/>
        </Box>
    </Flex>
}
