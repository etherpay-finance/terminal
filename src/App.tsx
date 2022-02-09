import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import { Logo } from "./Logo"
import { TerminalScreen } from "./components/TerminalScreen"
import {TerminalNumPad} from "./components/TerminalNumPad";
import {useCallback, useEffect, useState} from "react";
import {stringify} from "querystring";

export const App = () => {
  const [amount, setAmount] = useState('0');
  const [secondAmount, setSecondAmount] = useState('0');

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
    const exchangeRate = 3100;
    setSecondAmount((parseFloat(amount) / exchangeRate).toString())
  }, [amount]);

  return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100%" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              {/*<Logo h="40vmin" pointerEvents="none" />*/}
              <TerminalScreen amount={amount} currency={"$"} secondAmount={secondAmount} secondCurrency={'Ξ'}/>
              <TerminalNumPad onKeyPressed={onKeyPressed}/>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
  )
}
