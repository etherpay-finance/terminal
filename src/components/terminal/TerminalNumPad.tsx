import {Box, Button, Grid, SimpleGrid, Text} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";

export const TerminalNumPad = (props: { onAmountUpdated: (amount: string) => void; onConfirm: () => void; }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''];
    const [amount, setAmount] = useState('0');
    const onAmountUpdated = props.onAmountUpdated;

    const onKeyPressed = useCallback((key: string): void => {
        if (key === '') {
            return
        }

        let newAmount;
        if (key === 'confirm') {
            return;
        } else if (key === 'clearEntry') {
            if (amount.length === 1) {
                newAmount = '0'
            } else {
                newAmount = amount.substring(0, amount.length - 1)
            }
            setAmount(newAmount);
            return;
        } else if (key === 'clearAll') {
            newAmount = '0'
            setAmount(newAmount);
            return;
        } else if (key === '.') {
            if (amount.indexOf('.') === -1) {
                setAmount(amount + key);
            }
            return;
        }

        if (amount === '0') {
            newAmount = key;
        } else {
            newAmount = amount + key;
        }
        setAmount(newAmount);
    }, [amount]);

    useEffect(() => {
        onAmountUpdated(amount);
    }, [amount]);

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