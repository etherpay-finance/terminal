import {Box, Skeleton, Text, useColorModeValue} from "@chakra-ui/react";

export const TerminalScreen = (props: { amount: string; currency: string; secondCurrency?: string;
    secondAmount?: string, isLoading?: boolean}) => {
    const amount = props.amount;
    const currency = props.currency;
    const secondCurrency = props.secondCurrency;
    const secondAmount = props.secondAmount;

    const textColor = useColorModeValue('gray.700', 'gray.200')

    return <Box mt={3} mb={0} maxW={"90vw"}>
        <Text fontSize={'6xl'} color={textColor}>{amount} {currency}</Text>
        {
            secondCurrency !== undefined && secondAmount !== undefined ?
                <Text fontSize={'sm'} color={textColor} fontWeight={'extrabold'}>
                    { props.isLoading ?
                        <Skeleton height='21px' />
                        :
                        secondAmount + " " + secondCurrency
                    }
                </Text>
                :
                undefined
        }
    </Box>
};
