import {Box, Button, HStack, Skeleton, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import { useState } from "react";
import {FaEthereum, RiArrowDropDownLine} from "react-icons/all";
import NetworkSelectorButton from "../buttons/NetworkSelectorButton";
import NetworkSelector from "./NetworkSelector";

export const TerminalScreen = (props: { amount: string; currency: string; secondCurrency?: string;
    secondAmount?: string, isLoading?: boolean, isNetworkSwitcherDisabled?: boolean}) => {
    const [toggle, setToggle] = useState(false)

    const amount = props.amount;
    const currency = props.currency;
    const secondCurrency = props.secondCurrency;
    const secondAmount = props.secondAmount;

    const textColor = useColorModeValue('gray.700', 'gray.200')

    return <VStack mt={3} mb={0} maxW={"90vw"}>
        <Box>
            <Text fontSize={'6xl'} color={textColor}>{amount} {currency}</Text>
        </Box>
        {
            secondCurrency !== undefined && secondAmount !== undefined ?
                <Box fontSize={'md'} color={textColor} fontWeight={'extrabold'}>
                        <HStack>
                            { props.isLoading ?
                                <Skeleton height='21px'/>
                                :
                                <Text pl={5}>{secondAmount.substring(0, 12) + " " + secondCurrency + ''}</Text>
                            }
                            <NetworkSelectorButton isDisabled={props.isNetworkSwitcherDisabled} onToggle={() => {setToggle(!toggle)}}/>
                        </HStack>
                </Box>
                :
                undefined
        }
        <Box pt={2} display={toggle ? 'block' : 'none'}>
            <NetworkSelector onSelect={() => {setToggle(!toggle)}}/>
        </Box>
    </VStack>
};
