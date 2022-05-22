import {
    Button,
    ButtonGroup,
    HStack,
    Text,
    Spacer,
    VStack,
    Popover,
    PopoverTrigger,
    PopoverContent, useDisclosure
} from "@chakra-ui/react";
import {BiNetworkChart, FaEthereum, RiArrowDropDownLine} from "react-icons/all";
import {useWeb3Context} from "../../utils/Web3Context";


function NetworkSwitcher(props: {isDisabled?: boolean}) {
    const web3Context = useWeb3Context()

    const { onOpen, onClose, isOpen } = useDisclosure()

    function isActiveNetwork(id: number): boolean {
        return id === web3Context.network;
    }

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

    return <VStack>
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            closeOnBlur={true}>
            <PopoverTrigger>
                <Button
                    variant='ghost'
                    colorScheme={colorScheme(web3Context.network ? web3Context.network : 0)}
                    aria-label='Network'
                    size={'sm'}
                    fontSize={'md'}
                    isDisabled={props.isDisabled}
                >
                    <FaEthereum/>{chainName(web3Context.network ? web3Context.network : 0)}<RiArrowDropDownLine/>
                </Button>
            </PopoverTrigger>
            <PopoverContent x={-50}>
                <ButtonGroup fontSize={'lg'} spacing={0} isAttached={true}>
                    <Button
                        variant='outline'
                        isActive={isActiveNetwork(1)}
                        colorScheme='purple'
                        aria-label='Network'
                        size='lg'
                        onClick={() => {
                            web3Context.setNetwork(1)
                            onClose()
                        }}
                    >
                        <FaEthereum/> ETH
                    </Button>
                    <Button
                        variant='outline'
                        isActive={isActiveNetwork(10)}
                        colorScheme='red'
                        aria-label='Network'
                        size='lg'
                        onClick={() => {
                            web3Context.setNetwork(10)
                            onClose()
                        }}
                    >
                        <FaEthereum/>&nbsp;OP
                    </Button>
                    <Button
                        variant='outline'
                        isActive={isActiveNetwork(42161)}
                        colorScheme='blue'
                        aria-label='Network'
                        size='lg'
                        onClick={() => {
                            web3Context.setNetwork(42161)
                            onClose()
                        }}
                    >
                        <BiNetworkChart/>&nbsp;Arb
                    </Button>
                    <Button
                        variant='outline'
                        disabled={true}
                        colorScheme='gray'
                        aria-label='Network'
                        size='lg'>
                        <BiNetworkChart/>&nbsp;ZkSync
                    </Button>
                </ButtonGroup>
            </PopoverContent>
        </Popover>
    </VStack>
}

export default NetworkSwitcher
