
export class TokenPair {
   token0: string;
   token1: string;

   constructor(token0: string, token1: string) {
       this.token0 = token0;
       this.token1 = token1;
   }
}

export interface PriceOracle {
    price: (tokenPair: TokenPair) => Promise<string>
}