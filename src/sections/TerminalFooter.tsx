import {ButtonGroup, Container, IconButton, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {FaDonate, FaTwitter, MdEmail} from "react-icons/all";
import * as React from "react";

export const TerminalFooter = () => {
    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");

    return <Container as="footer" role="contentinfo" py={5} maxW={"100%"} px={5} bgColor={bgColor}>
        <Stack spacing={{ base: '3', md: '4' }}>
            <Stack justify="space-between" direction="row" align="center">
                <ButtonGroup variant="ghost">
                    <IconButton
                        as="a"
                        href="https://etherscan.io/address/0x816e922bE15674E68aACB275D6649b5C6BE0551d"
                        aria-label="Donate"
                        target="_blank"
                        icon={<FaDonate fontSize="1.25rem" />}
                    >
                        Donate
                    </IconButton>
                </ButtonGroup>
                <ButtonGroup variant="ghost">
                    <IconButton
                    as="a"
                    href="https://twitter.com/Termina80565257"
                    aria-label="Twitter"
                    target="_blank"
                    icon={<FaTwitter fontSize="1.25rem" />}
                    />
                    <IconButton
                        as="a"
                        href="mailto:terminal-etherpay@proton.me"
                        aria-label="Email"
                        target="_blank"
                        icon={<MdEmail fontSize="1.25rem" />}
                    />
                </ButtonGroup>
            </Stack>
            <Text fontSize="sm" color="subtle">
                &copy; {new Date().getFullYear()} EtherPay, All rights reserved.
            </Text>
        </Stack>
    </Container>
}
