import {Box, Text} from "@chakra-ui/react";

export const TerminalScreen = (props: { amount: string; currency: string; secondCurrency?: string;
    secondAmount?: string, isLoading?: boolean}) => {
    const amount = props.amount;
    const currency = props.currency;
    const secondCurrency = props.secondCurrency;
    const secondAmount = props.secondAmount;

    return <Box mt={5} mb={0} maxW={"90vw"}>
        <Text fontSize={'6xl'} color={'gray.500'}>{amount} {currency}</Text>
        {
            secondCurrency !== undefined && secondAmount !== undefined ?
                <Text fontSize={'sm'} color={'gray.500'} fontWeight={'extrabold'}>
                    { props.isLoading ?
                        <Box> Querying price... </Box>
                        :
                        secondAmount + " " + secondCurrency
                    }
                </Text>
                :
                undefined
        }
    </Box>
};
