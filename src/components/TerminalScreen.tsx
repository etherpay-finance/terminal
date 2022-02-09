import {Box, Text} from "@chakra-ui/react";

export const TerminalScreen = (props: { amount: string; currency: string; secondCurrency?: string;
    secondAmount?: string}) => {
    const amount = props.amount;
    const currency = props.currency;
    const secondCurrency = props.secondCurrency;
    const secondAmount = props.secondAmount;

    return <Box>
        <Text fontSize={'6xl'} color={'gray.500'}>{amount} {currency}</Text>
        {
            secondCurrency !== undefined && secondAmount !== undefined ?
                <Text fontSize={'sm'} color={'gray.500'} fontWeight={'extrabold'}>
                    {secondAmount} {secondCurrency}
                </Text>
                :
                undefined
        }
    </Box>
};
