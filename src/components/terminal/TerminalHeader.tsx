import {ColorModeSwitcher} from "../buttons/ColorModeSwitcher";
import * as React from "react";
import {
    Text,
    Box,
    Flex,
    Spacer,
    HStack, Container, IconButton, ButtonGroup, Select, useColorMode, useColorModeValue, VStack
} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {BiX, BiMenu, BiUser, BiNetworkChart, FaLinkedin} from "react-icons/all";
import {useWeb3Context} from "../../utils/Web3Context";
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {shortAddress} from "../../utils/ethAddressUtils";

const MenuItems = (props: { children: any, onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined, isLast?: boolean, to?: string | undefined; target?: string | undefined }) => {
    const { children, isLast, to = "/", target, ...rest } = props;
    return (
        <Text
            mb={{ base: isLast ? 0 : 3, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 3 }}
            fontWeight={"bold"}
            display="block"
            {...rest}
            onClick={props.onClick}
        >
            { to.startsWith("http") ?
                <a href={to} target={target}>{children}</a>
                :
                <Link to={to} target={target}>{children}</Link>
            }
        </Text>
    )
}

export const TerminalHeader = () => {
    const web3Context = useWeb3Context();

    const [wallet, setWallet] = useState("");

    const [show, setShow] = useState(false)
    const toggleMenu = () => setShow(!show)
    const menuBgColor = useColorModeValue('gray.100', 'gray.700')

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
        menuItems.push(
            <MenuItems to={"https://zapper.fi/account/" + wallet} target="_blank">
                <HStack>
                    <BiUser/><Box>{shortAddress(wallet)}</Box>
                </HStack>
            </MenuItems>);
        /*menuItems.push(<MenuItems><HStack>
            <Text>Network:</Text> <Select variant='unstyled'>
                    <option value={1}>
                        Ethereum
                    </option>
                </Select>
            </HStack></MenuItems>);*/
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
            w="100%"
            pl={2}
            pr={2}>
        <Logo text="Terminal" />
        <Spacer />
        <ButtonGroup variant="ghost" display={{ base: "block", md: "none" }}>
            <IconButton
                as="a"
                aria-label={"Menu"}
                target="_blank"
                icon={show ? <BiX fontSize="1.25rem"/> : <BiMenu fontSize="1.25rem"/>}
                onClick={toggleMenu}
                />
        </ButtonGroup>
        <Box
            display={{ base: show ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
            bgColor={[menuBgColor, 'inherit']}
        >
            <Flex
                align={["center", "center", "center", "center"]}
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[5, 5, 0, 0]}
                pb={[3, 3, 0, 0]}
            >
                {menuItems}
            </Flex>
        </Box>
    </Flex>
}
