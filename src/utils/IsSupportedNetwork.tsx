import {Box} from "@chakra-ui/react";
import {useWeb3Context} from "./Web3Context";
import {useState, useEffect} from "react";
import {TerminalSimpleLayout} from "../pages/layouts/TerminalSimpleLayout";

function IsSupportedNetwork(props: {children: React.ReactElement, supportedNetworks: Array<number>}) {
    const web3Context = useWeb3Context();
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        web3Context.signer?.provider?.getNetwork().then((network) => {
            let supported = false;

            props.supportedNetworks.forEach(function (chainId) {
                if (chainId === network.chainId) {
                    supported = true;
                }
            })

            setIsSupported(supported);
        })
    }, [web3Context])

    const whenSupported = <Box>
        {props.children}
    </Box>

    const whenNotSupported = <TerminalSimpleLayout>
        Not supported network!
    </TerminalSimpleLayout>

    if (!web3Context.wallet) {
        return whenSupported;
    } else {
        if (isSupported) {
            return whenSupported;
        } else {
            return whenNotSupported;
        }
    }
}

export default IsSupportedNetwork
