import {
    Button,
} from "@chakra-ui/react";
import {FaEthereum, RiArrowDropDownLine} from "react-icons/all";
import {useWeb3Context} from "../../utils/Web3Context";


function NetworkSelectorButton(props: {isDisabled?: boolean, onToggle: () => void}) {
    const web3Context = useWeb3Context()

    function chainName(id: number): string {
        if (id === 1) {
            return "Ethereum"
        } else if (id === 10) {
            return "Optimism"
        } else if (id === 42161) {
            return "Arbitrum"
        }
        return "Unknown"
    }

    function colorScheme(id: number): string {
        if (id === 1) {
            return "purple"
        } else if (id === 10) {
            return "red"
        } else if (id === 42161) {
            return "blue"
        }
        return "gray"
    }

    return <Button
                variant='ghost'
                colorScheme={colorScheme(web3Context.network ? web3Context.network : 0)}
                aria-label='Network'
                size={'sm'}
                fontSize={'md'}
                isDisabled={props.isDisabled}
                onClick={props.onToggle}
            >
            <FaEthereum/>{chainName(web3Context.network ? web3Context.network : 0)}<RiArrowDropDownLine/>
        </Button>
}

export default NetworkSelectorButton
