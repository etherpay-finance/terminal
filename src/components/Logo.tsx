import {Box, Text} from "@chakra-ui/react";
import * as React from "react";

export const Logo = (props: { text: string }) => {
    return <Box m="1">
        <Text fontWeight={'bold'}>Ξ {props.text}</Text>
    </Box>
}