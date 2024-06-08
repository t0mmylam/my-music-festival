import {
    ChakraProvider,
    Box,
    Button,
    VStack,
    Heading,
    Text,
    Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function App() {
    const handleSpotifyLogin = () => {
        const clientId = "4e30948e5e474f8d8f70601f71cdb64f";
        const redirectUri = "http://localhost:5173";
        const scope = "user-read-private user-read-email";
        const authEndpoint = "https://accounts.spotify.com/authorize";

        const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

        window.location.href = loginUrl;
    };

    const [token, setToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = (
                hash
                    .substring(1)
                    .split("&")
                    .find((elem) => elem.startsWith("access_token")) as string
            )?.split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token ?? "");
    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };

    return (
        <ChakraProvider>
            <Flex justifyContent="center" alignItems="center" minHeight="100vh">
                <Box textAlign="center" fontSize="xl">
                    <VStack spacing={8}>
                        <Heading as="h1" size="2xl" mt={10}>
                            My Music Festival Poster Generator
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            Discover and create posters based on your top
                            Spotify artists.
                        </Text>
                        {!token ? (
                            <Button
                                colorScheme="green"
                                size="lg"
                                onClick={handleSpotifyLogin}
                            >
                                Login with Spotify
                            </Button>
                        ) : (
                            <Button
                                colorScheme="red"
                                size="lg"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        )}
                    </VStack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
