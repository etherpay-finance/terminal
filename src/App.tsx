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

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100%" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          {/*<Logo h="40vmin" pointerEvents="none" />*/}
          <TerminalScreen amount={50.0} currency={"$"} secondAmount={0.015} secondCurrency={'Ξ'}/>
          <TerminalNumPad/>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
