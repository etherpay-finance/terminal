import {PriceOracle, TokenPair} from "./PriceOracle";

import {Contract, ethers} from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import IUniswapV3FactoryABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import IERC20Minimal from "@uniswap/v3-core/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";


interface Immutables {
    factory: string;
    token0: string;
    token1: string;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
    liquidity: ethers.BigNumber;
    sqrtPriceX96: ethers.BigNumber;
    tick: number;
    observationIndex: number;
    observationCardinality: number;
    observationCardinalityNext: number;
    feeProtocol: number;
    unlocked: boolean;
}

export class UniswapV3Oracle implements PriceOracle {
    factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
    factoryInstance: Contract;
    provider: ethers.providers.Provider;

    constructor(provider: ethers.providers.Provider) {
        this.provider = provider;
        this.factoryInstance = new ethers.Contract(
            this.factoryAddress,
            IUniswapV3FactoryABI.abi,
            provider
        );
    }

    async price(tokenPair: TokenPair): Promise<string> {
        const thiz = this;
        return new Promise<string>(async function (resolve, reject) {
            const fee = 500;
            const poolAddress = await thiz.factoryInstance.getPool(tokenPair.token0, tokenPair.token1, fee);
            const poolInstance = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, thiz.provider);

            const immutables = await thiz.getPoolImmutables(poolInstance);
            const state = await thiz.getPoolState(poolInstance);

            const TokenA = new Token(1, immutables.token1, 6);
            const TokenB = new Token(1, immutables.token0, 18);

            const pool = new Pool(
                TokenA,
                TokenB,
                immutables.fee,
                state.sqrtPriceX96.toString(),
                state.liquidity.toString(),
                state.tick
            );

            resolve(pool.token1Price.toSignificant(12));
        });
    }

    async getPoolImmutables(poolContract: Contract) {
        const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
            await Promise.all([
                poolContract.factory(),
                poolContract.token0(),
                poolContract.token1(),
                poolContract.fee(),
                poolContract.tickSpacing(),
                poolContract.maxLiquidityPerTick(),
            ]);

        const immutables: Immutables = {
            factory,
            token0,
            token1,
            fee,
            tickSpacing,
            maxLiquidityPerTick,
        };
        return immutables;
    }

    async getPoolState(poolContract: Contract) {
        const [liquidity, slot] = await Promise.all([
            poolContract.liquidity(),
            poolContract.slot0(),
        ]);

        const PoolState: State = {
            liquidity,
            sqrtPriceX96: slot[0],
            tick: slot[1],
            observationIndex: slot[2],
            observationCardinality: slot[3],
            observationCardinalityNext: slot[4],
            feeProtocol: slot[5],
            unlocked: slot[6],
        };

        return PoolState;
    }

}