import {Box, Button, Grid, SimpleGrid, Text} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";
import useKeyPress from "../../utils/useKeyPress";

export const TerminalNumPad = (props: { onAmountUpdated: (amount: string) => void; onConfirm: () => void; isLoading: boolean}) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''];
    const [amount, setAmount] = useState('0');
    const onAmountUpdated = props.onAmountUpdated;
    const onConfirm = props.onConfirm;

    const onKeyPressed = useCallback((key: string): void => {
        if (key === '') {
            return
        }

        let newAmount;
        if (key === 'Enter') {
            onConfirm()
            return;
        } else if (key === 'Backspace') {
            if (amount.length === 1) {
                newAmount = '0'
            } else {
                newAmount = amount.substring(0, amount.length - 1)
            }
            setAmount(newAmount);
            return;
        } else if (key === 'ShiftBackspace') {
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
    }, [amount, onConfirm]);

    useEffect(() => {
        onAmountUpdated(amount);
    }, [amount]);

    useKeyPress(
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Backspace', 'Delete', 'Enter'],
        (event: KeyboardEvent) => { onKeyPressed((event.shiftKey ? 'Shift' : '') + event.key) }
    );

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
                <Button colorScheme={'orange'} size={'xl'} onClick={() => onKeyPressed('Backspace')}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>CE</Text>
                    </Box>
                </Button>
                <Button colorScheme={'red'} size={'xl'} onClick={() => onKeyPressed('ShiftBackspace')}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>CA</Text>
                    </Box>
                </Button>
                <Button colorScheme={'green'} size={'xl'} onClick={() => onConfirm()} disabled={props.isLoading}>
                    <Box m={3}>
                        <Text fontWeight={'semibold'}>Confirm</Text>
                    </Box>
                </Button>
            </SimpleGrid>
        </Grid>
    </Box>
};
