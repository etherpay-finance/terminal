import {Box, Button, Grid, SimpleGrid, Text} from "@chakra-ui/react";
import {useState} from "react";

export const TerminalNumPad = (props: { onKeyPressed: (key: string) => void; }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''];
    const onKeyPressed = props.onKeyPressed;

    return <Box>
        <Grid>
            <SimpleGrid columns={3} spacing={3}>
                {keys.map(key => (
                    <Button colorScheme={'teal'} size={'xl'} onClick={() => onKeyPressed(key)}>
                        <Box m={3}>
                            <Text fontWeight={'semibold'}>{key}</Text>
                        </Box>
                    </Button>
                ))}
                <Button colorScheme={'yellow'} size={'xl'} onClick={() => onKeyPressed('clearEntry')}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>CE</Text>
                    </Box>
                </Button>
                <Button colorScheme={'red'} size={'xl'} onClick={() => onKeyPressed('clearAll')}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>CA</Text>
                    </Box>
                </Button>
                <Button colorScheme={'green'} size={'xl'} onClick={() => onKeyPressed('confirm')}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>Confirm</Text>
                    </Box>
                </Button>
            </SimpleGrid>
        </Grid>
    </Box>
};