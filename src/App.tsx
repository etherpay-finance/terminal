import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Web3Context } from "./utils/Web3Context";
import { Terminal } from "./pages/Terminal";
import { TerminalPayment } from "./pages/TerminalPayment";
import {TerminalWalletSelect} from "./pages/TerminalWalletSelect";

export const App = () => {
  return (
      <ChakraProvider theme={theme}>
          <Web3Context walletSelection={<TerminalWalletSelect/>}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Terminal/>} />
                      <Route path="/payment" element={<TerminalPayment />} />
                          {/*} <Route path="about" element={<About />} />
                          <Route path="dashboard" element={<Dashboard />} />

                          {/* Using path="*"" means "match anything", so this route
                        acts like a catch-all for URLs that we don't have explicit
                        routes for. }
                          <Route path="*" element={<NoMatch />} />
                          */}
                  </Routes>
              </BrowserRouter>
          </Web3Context>
      </ChakraProvider>
  )
}
