import {Box, Container, Spacer, Text, VStack} from "@chakra-ui/react";

import {TerminalSimpleLayout} from "./layouts/TerminalSimpleLayout";
import {FaRegFrownOpen, FaRegSadTear, WiThunderstorm} from "react-icons/all";

function NotSupportedNetwork() {
    return <TerminalSimpleLayout>
        <VStack mt={20} spacing={8}>
            <WiThunderstorm size={150}/>
            <Text fontWeight={"bold"}>
                Not supported network!
            </Text>
        </VStack>
    </TerminalSimpleLayout>
}

export default NotSupportedNetwork
