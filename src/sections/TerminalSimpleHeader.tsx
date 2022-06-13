import * as React from "react";
import {Box, Flex, Spacer} from "@chakra-ui/react";
import {Logo} from "../components/Logo";
import {ColorModeSwitcher} from "../components/buttons/ColorModeSwitcher";

export const TerminalSimpleHeader = () => {
    return <Flex pl={2} pr={2}>
        <Logo text="Terminal" />
        <Spacer />
        <Box>
            <ColorModeSwitcher justifySelf="flex-end" size={"md"}/>
        </Box>
    </Flex>
}
