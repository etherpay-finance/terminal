import {VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalNumPad} from "../components/terminal/TerminalNumPad";
import {TerminalLayout} from "./layouts/TerminalLayout";
import * as React from "react";

export const TerminalPayment = () => {

    return <TerminalLayout>
        <VStack spacing={8}>
            <TerminalScreen amount="1" currency={"$"} secondAmount="2" secondCurrency={'Ξ'}/>
        </VStack>
    </TerminalLayout>
}