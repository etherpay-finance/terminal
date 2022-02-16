import {Box, Grid} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../../components/buttons/ColorModeSwitcher";
import * as React from "react";
import {TerminalHeader} from "../../components/terminal/TerminalHeader";
import {TerminalFooter} from "../../components/terminal/TerminalFooter";

export const TerminalLayout = (props: { children: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }) => {
    return <Box textAlign="center" fontSize="xl">
        <Grid minH="100%" p={3}>
            <TerminalHeader/>
            {props.children}
            <TerminalFooter/>
        </Grid>
    </Box>
};