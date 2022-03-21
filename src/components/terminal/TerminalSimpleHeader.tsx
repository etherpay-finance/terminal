import * as React from "react";
import {Box, Flex, Spacer} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {ColorModeSwitcher} from "../buttons/ColorModeSwitcher";

export const TerminalSimpleHeader = () => {
    return <Flex>
        <Logo text="Terminal" />
        <Spacer />
        <Box>
            <ColorModeSwitcher justifySelf="flex-end" size={"md"}/>
        </Box>
    </Flex>
}