
export interface TokenPair {
   token1: string
   token2: string
}

export interface PriceOracle {
    price: (tokenPair: TokenPair) => number
}