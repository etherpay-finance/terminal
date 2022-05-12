import {Box, ButtonGroup, Container, IconButton, Stack, Text} from "@chakra-ui/react";
import {FaDonate, FaGithub, FaLinkedin, FaTwitter} from "react-icons/all";
import * as React from "react";

export const TerminalFooter = () => {
    return <Container as="footer" role="contentinfo" py={5} maxW={"100%"} px={3}>
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
                        href="https://www.linkedin.com/in/marcin-gorzynski/?locale=en_US"
                        aria-label="LinkedIn"
                        target="_blank"
                        icon={<FaLinkedin fontSize="1.25rem" />}
                    />
                    <IconButton as="a" href="https://github.com/marino39" target="_blank" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
                    <IconButton
                        as="a"
                        href="https://twitter.com/marino2008"
                        aria-label="Twitter"
                        target="_blank"
                        icon={<FaTwitter fontSize="1.25rem" />}
                    />
                </ButtonGroup>
            </Stack>
            <Text fontSize="sm" color="subtle">
                &copy; {new Date().getFullYear()} EtherPay, All rights reserved.
            </Text>
        </Stack>
    </Container>
}
