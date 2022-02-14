import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

import {Terminal} from "./pages/Terminal";
import {TerminalLayout} from "./pages/layouts/TerminalLayout";

export const App = () => {
  return (
      <ChakraProvider theme={theme}>
        <TerminalLayout>
          <Terminal/>
        </TerminalLayout>
      </ChakraProvider>
  )
}
