import {
    Box,
    Link,
    Text,
    HStack,
    VStack,
    Container,
    Button,
    Icon,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

function Footer() {
    return (
        <Box
            as="footer"
            py={6}
            mt={12}
            bg="gray.800"
            color="white"
            width="100%"
        >
            <Container maxW="container.xl">
                <HStack spacing={8} justifyContent="center" width="100%">
                    <Text fontSize="sm" textAlign="center">
                        <Link href="https://thomaslam.info" isExternal>
                            Thomas Lam
                        </Link>{" "}
                        &copy; 2024
                    </Text>
                    <Button
                        as={Link}
                        href="https://github.com/t0mmylam/my-music-festival"
                        isExternal
                        variant="ghost"
                        colorScheme="whiteAlpha"
                    >
                        <Icon as={FaGithub} w={6} h={6} />
                    </Button>
                    <Link
                        href="https://buymeacoffee.com/t0mmylam"
                        isExternal
                    >
                        <Button
                            leftIcon={<SiBuymeacoffee />}
                            colorScheme="yellow"
                            variant="solid"
                        >
                            Buy Me a Coffee
                        </Button>
                    </Link>
                </HStack>
            </Container>
        </Box>
    );
}

export default Footer;
