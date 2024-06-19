// src/App.js
import {
    ChakraProvider,
    Box,
    Button,
    VStack,
    Heading,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SpotifyPage from "./pages/Spotify";

function App() {
    const handleSpotifyLogin = () => {
        const clientId = "4e30948e5e474f8d8f70601f71cdb64f";
        const redirectUri = "http://localhost:5173/spotify";
        const scope = "user-read-private user-read-email user-top-read";
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
            <Router>
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    flexDirection="column"
                >
                    <Box textAlign="center" fontSize="xl" flex="1">
                        <Routes>
                            <Route
                                path="/spotify"
                                element={<SpotifyPage token={token} />}
                            />
                            <Route
                                path="/"
                                element={
                                    <VStack spacing={8}>
                                        <Heading as="h1" size="2xl" mt={10}>
                                            My Music Festival Poster Generator
                                        </Heading>
                                        <Text fontSize="lg" color="gray.600">
                                            Discover and create posters based on
                                            your top Spotify artists.
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
                                            <Box>
                                                <Button
                                                    colorScheme="red"
                                                    size="lg"
                                                    onClick={logout}
                                                >
                                                    Logout
                                                </Button>
                                            </Box>
                                        )}
                                    </VStack>
                                }
                            />
                        </Routes>
                    </Box>
                    <Footer />
                </Flex>
            </Router>
        </ChakraProvider>
    );
}

export default App;
``;
