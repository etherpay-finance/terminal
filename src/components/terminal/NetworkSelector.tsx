import {Button, ButtonGroup} from "@chakra-ui/react";
import {BiNetworkChart, FaEthereum} from "react-icons/all";
import {useWeb3Context} from "../../utils/Web3Context";

function NetworkSelector(props: {display?: string, onSelect?: () => void}) {
    const web3Context = useWeb3Context()

    function isActiveNetwork(id: number): boolean {
        return id === web3Context.network;
    }

    return <ButtonGroup display={props.display} fontSize={'md'} spacing={0} isAttached={true}>
        <Button
            variant='outline'
            isActive={isActiveNetwork(1)}
            colorScheme='purple'
            aria-label='Network'
            size='sm'
            onClick={() => {
                web3Context.setNetwork(1)
                props.onSelect && props.onSelect()
            }}
        >
            <FaEthereum/> ETH
        </Button>
        <Button
            variant='outline'
            isActive={isActiveNetwork(10)}
            colorScheme='red'
            aria-label='Network'
            size='sm'
            onClick={() => {
                web3Context.setNetwork(10)
                props.onSelect && props.onSelect()
            }}
        >
            <FaEthereum/>&nbsp;OP
        </Button>
        <Button
            variant='outline'
            isActive={isActiveNetwork(42161)}
            colorScheme='blue'
            aria-label='Network'
            size='sm'
            onClick={() => {
                web3Context.setNetwork(42161)
                props.onSelect && props.onSelect()
            }}
        >
            <BiNetworkChart/>&nbsp;Arb
        </Button>
        <Button
            variant='outline'
            disabled={true}
            colorScheme='gray'
            aria-label='Network'
            size='sm'>
            <BiNetworkChart/>&nbsp;ZkSync
        </Button>
    </ButtonGroup>
}

export default NetworkSelector
