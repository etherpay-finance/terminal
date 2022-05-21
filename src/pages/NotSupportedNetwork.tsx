import {Text, VStack} from "@chakra-ui/react";

import {TerminalSimpleLayout} from "./layouts/TerminalSimpleLayout";
import {
    RiErrorWarningLine,
} from "react-icons/all";

function NotSupportedNetwork() {
    return <TerminalSimpleLayout>
        <VStack mt={30} spacing={8}>
            <RiErrorWarningLine size={150}/>
            <Text fontWeight={"bold"}>
                Network not supported. Please select other network!
            </Text>
        </VStack>
    </TerminalSimpleLayout>
}

export default NotSupportedNetwork
