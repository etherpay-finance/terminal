import {Box, useColorModeValue, VStack} from "@chakra-ui/react";
import {TerminalScreen} from "../components/terminal/TerminalScreen";
import {TerminalLayout} from "./layouts/TerminalLayout";
import * as React from "react";
import QRCode from "react-qr-code";
import {useLocation} from "react-router-dom";

export const TerminalPayment = () => {
    const fgColor = useColorModeValue("#FFFFFF", "#A0AEC0")
    const bgColor = useColorModeValue("#2D3748", "#1A202C")
    const location = useLocation()

    console.log(location);
    return <TerminalLayout>
        <VStack spacing={8}>
            <TerminalScreen amount="1" currency={"$"} secondAmount="2" secondCurrency={'Ξ'}/>
            <Box>
                <QRCode value="ethereum:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359@1?value=2.014e18"
                        fgColor={fgColor}
                        bgColor={bgColor}
                />
            </Box>
        </VStack>
    </TerminalLayout>
}