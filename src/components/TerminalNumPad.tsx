import {Box, Grid, SimpleGrid, Text} from "@chakra-ui/react";

export const TerminalNumPad = () => {
    return <Box>
        <Grid>
            <SimpleGrid columns={3} spacing={3}>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>1</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>2</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>3</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>4</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>5</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>6</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>7</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>8</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>9</Text>
                    </Box>
                </Box>
                <Box bg='teal.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>.</Text>
                    </Box>
                </Box>
                <Box bg='yellow.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>Clear</Text>
                    </Box>
                </Box>
                <Box bg='green.500' borderRadius={'5%'}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>Confirm</Text>
                    </Box>
                </Box>
            </SimpleGrid>
        </Grid>
    </Box>
};