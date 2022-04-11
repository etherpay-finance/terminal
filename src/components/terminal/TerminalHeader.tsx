import {ColorModeSwitcher} from "../buttons/ColorModeSwitcher";
import * as React from "react";
import {
    Text,
    Box,
    Flex,
    Spacer,
    HStack
} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {BiX, BiMenu, BiUser} from "react-icons/all";
import {useWeb3Context} from "../../utils/Web3Context";
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {shortAddress} from "../../utils/ethAddressUtils";

const MenuItems = (props: { children: any, onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined, isLast?: boolean, to?: string | undefined; }) => {
    const { children, isLast, to = "/", ...rest } = props;
    return (
        <Text
            mb={{ base: isLast ? 0 : 3, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 3 }}
            fontWeight={"bold"}
            display="block"
            {...rest}
            onClick={props.onClick}
        >
            <Link to={to}>{children}</Link>
        </Text>
    )
}

export const TerminalHeader = () => {
    const web3Context = useWeb3Context();

    const [wallet, setWallet] = useState("");

    const [show, setShow] = useState(false)
    const toggleMenu = () => setShow(!show)

    const handleDisconnect = useCallback(() => {
        web3Context.setWallet(undefined);
        web3Context.setSigner(undefined);
    }, [web3Context]);

    useEffect(() => {
        async function fetchData() {
            if (web3Context === undefined || web3Context.signer === undefined) {
                return;
            }

            const wallet = await web3Context.signer.getAddress();
            setWallet(wallet);
        }

        fetchData();
    }, [web3Context])

    let menuItems = [];
    if (web3Context !== undefined) {
        menuItems.push(<MenuItems to="#">
            <HStack>
                <BiUser/><Box>{shortAddress(wallet)}</Box>
            </HStack></MenuItems>);
        //menuItems.push(<MenuItems to="/History">History</MenuItems>);
        //menuItems.push(<MenuItems to="/Settings">Settings</MenuItems>);
        menuItems.push(<MenuItems to="#" onClick={handleDisconnect}>Disconnect</MenuItems>);
    }
    menuItems.push(<HStack>
        <ColorModeSwitcher/>
    </HStack>);

    return <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%">
        <Logo text="Terminal" />
        <Spacer />
        <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
            {show ? <BiX/> : <BiMenu/>}
        </Box>
        <Box
            display={{ base: show ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Flex
                align={["center", "center", "center", "center"]}
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[5, 5, 0, 0]}
            >
                {menuItems}
            </Flex>
        </Box>
    </Flex>
}