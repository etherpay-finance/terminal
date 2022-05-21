import {PriceOracle, TokenPair} from "./PriceOracle";
import {BigNumber, Contract, ethers} from "ethers";

const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

type TokenPairToAddressMapping = {
    [key: string]: string;
};

type ChainIdToAggregatorMappings = {
    [key: number]: TokenPairToAddressMapping;
};

const ChainIdToAggregatorMappings: ChainIdToAggregatorMappings = {
    1: {
        'ETH_USD': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    },
    10: {
        'ETH_USD': '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
    },
    42161: {
        'ETH_USD': '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
    },
    // test
    1337: {
        'ETH_USD': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    },
}

function CreateKey(tokenPair: TokenPair): string {
    return tokenPair.token0 + "_" + tokenPair.token1
}

export class ChainlinkOracle implements PriceOracle {
    provider: ethers.providers.Provider;

    constructor(provider: ethers.providers.Provider) {
        this.provider = provider;
    }

    async price(tokenPair: TokenPair): Promise<string> {
        const thiz = this;
        return new Promise<string>(async function (resolve, reject) {
            const network = await thiz.provider.getNetwork()

            const aggregatorInstance = new ethers.Contract(
                ChainIdToAggregatorMappings[network.chainId][CreateKey(tokenPair)],
                aggregatorV3InterfaceABI,
                thiz.provider
            );

            const data = await aggregatorInstance.latestRoundData();
            resolve((data.answer.toNumber() / 10**8).toString());
        });
    }
}

export default ChainlinkOracle;
