import {Box, Grid} from "@chakra-ui/react";
import * as React from "react";
import {TerminalSimpleHeader} from "../../components/terminal/TerminalSimpleHeader";
import {TerminalFooter} from "../../components/terminal/TerminalFooter";

export const TerminalSimpleLayout = (props: { children: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }) => {
    return <Box textAlign="center" fontSize="xl">
        <Grid minH="100%" p={3} pt={2}>
            <TerminalSimpleHeader/>
            {props.children}
            <TerminalFooter/>
        </Grid>
    </Box>
};